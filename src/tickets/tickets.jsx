import { useState, memo, useEffect, useRef  } from 'react';
import { MoreVertical, Plus, Search, Clock, Star, AlertCircle, Filter, ChevronDown,ChevronLeft, ChevronRight, Tag } from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import help from "../../public/closeimage.png";
import helpVivid from "../../src/assets/Images/quiz-type/star.png"
import nyayahImage from "../../src/assets/Images/dashboard/print.png"
import trophy from "../../src/assets/Images/dashboard/trophy.png"
// import nyayahImage from "../../src/assets/Images/images/quizresults/schedule.png";
import Navigation from "../navbar/navbar";
import close from "../../src/assets/Images/images/dashboard/cancel.png"


const MyTickets = () => {
    const navigate = useNavigate();
  const [view, setView] = useState('main');
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 5;
  
  
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [draggedTicket, setDraggedTicket] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterFeature, setFilterFeature] = useState('All');
  const [ticketDetails, setTicketDetails] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
const [newComment, setNewComment] = useState('');
const [editComment, setEditComment] = useState('');
const inputRef = useRef(null); // Ref for adding new comments
const editInputRef = useRef(null); // Ref for editing comments
const user_id = localStorage.getItem('user_id');
const orgId = localStorage.getItem('org_id'); // Check for orgId in localStorage

// Focus the add comment input box when the component mounts
useEffect(() => {
  if (inputRef.current) {
    inputRef.current.focus();
  }
}, []);

// Focus the edit input box when editing starts
useEffect(() => {
  if (editingCommentId !== null && editInputRef.current) {
    editInputRef.current.focus();
  }
}, [editingCommentId]);

useEffect(() => {
    window.scrollTo(0, 0); // Optional safeguard, if applicable
  }, []);
  


const [categories, setCategories] = useState([]);
const [priorities, setPriorities] = useState([]);
const [statuses, setStatuses] = useState([]);
const [admins, setAdmins] = useState([]);

const [selectedStatus, setSelectedStatus] = useState();
const [selectedPriorities, setSelectedPriorities] = useState();
const [selectedcategories, setSelectedScategories] = useState();
const [selectedAdmins, setSelectedAdmins] = useState();

const handleStatusChange = (e) => {
  const selectedStatusId = parseInt(e.target.value, 10);// Get the selected ID
  setSelectedStatus(selectedStatusId); // Update the state with the selected status ID
};

const handleselectedPriorities = (e) => {
  const selectedPrioritiesId = parseInt(e.target.value, 10); // Get the selected ID
  setSelectedPriorities(selectedPrioritiesId); // Update the state with the selected status ID
};
const handleStatuscategories = (e) => {
  const selectedcategoriesId = parseInt(e.target.value, 10); // Get the selected ID
  setSelectedScategories(selectedcategoriesId); // Update the state with the selected status ID
};
// const handleStatusChange = (e) => {
//   const selectedStatusId = e.target.value; // Get the selected ID
//   setSelectedStatus(selectedStatusId); // Update the state with the selected status ID
// };
 useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        setIsLoading(true);
        const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage

        if (!authToken) {
          console.error('No authentication token found. Please log in again.');
          return;
        }
        // Replace the URL and token as needed
        const response = await fetch(`https://dev.quizifai.com:8010/tkt_dropdowns?orgid=${orgId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify({}),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch dropdown data');
        }

        const data = await response.json();

        if (data.response === "success") {
          // Populate state with the received data
          setCategories(data.data.categories);
          setPriorities(data.data.priorities);
          setStatuses(data.data.statuses);
          setAdmins(data.data.admins);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDropdowns();
  }, []);


  const formatDate = (dateString) => {
  if (!dateString) return 'N/A'; 
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString(undefined, options); 
};

  

useEffect(() => {
  const fetchTickets = async () => {
    try {
      setIsLoading(true);
      const user_id = localStorage.getItem('user_id');
      const authToken = localStorage.getItem('authToken');

      if (!authToken) {
        console.error('No authentication token found. Please log in again.');
        return;
      }

      if (!user_id) {
        throw new Error('User ID not found in session storage');
      }

      const url = `https://dev.quizifai.com:8010/view_tkt?ownerid=${user_id}`;

      const response = await fetch(url, {
        method: 'POST', // Change to 'GET' if the API doesn't require POST
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: null, // Remove if the API doesn't require a request body
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }

      const result = await response.json();
      console.log('Fetched Tickets Response:', result);

      if (result.response === 'success') {
        const transformedTickets = result.data.map(ticket => ({
          id: `#${ticket.ticket_id}`,
          title: `Ticket ${ticket.ticket_id}`,
          description: ticket.ticket_description || 'No description provided',
          feature: ticket.category || 'Other',
          status: ticket.status || 'New',
          priority: ticket.priority_level || 1,
          createdAt: formatDate(ticket.audit[0]?.created_date) || 'Unknown',
          lastUpdated: formatDate(ticket.audit[ticket.audit.length - 1]?.created_date) || 'Unknown',
          attachments: ticket.attachments.filter(att => att.file_name),
          comments: ticket.comments.filter(comment => comment.comment_text) || [],
          assignedTo: ticket.assignedto_id,
        }));

        setTickets(transformedTickets);
      } 
    } catch (err) {
      console.error('Error fetching tickets:', err);
      setError(err.message);

      if (process.env.NODE_ENV === 'development') {
        setTickets([
          {
            id: '#1',
            title: 'Sample Ticket',
            description: 'This is a fallback ticket for testing',
            feature: 'Other',
            status: 'New',
            priority: 1,
            createdAt: '1 day ago',
            lastUpdated: 'Just now',
          },
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  fetchTickets();
}, []);

const fetchTicketDetails = async () => {
  if (!selectedTicket) return;

  try {
    setIsLoading(true);
    const ticketId = selectedTicket.id.replace('#', ''); // Remove the # from ticket ID
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      console.error('No authentication token found. Please log in again.');
      return;
    }
    const response = await fetch(`https://dev.quizifai.com:8010/view_tkt?ticketid=${ticketId}`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({}), // Optional empty body to mimic the curl request
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.response === 'success') {
      setTicketDetails({
        ...result.data,
        formattedAttachments: result.data.attachments.filter((att) => att.file_name),
        formattedComments: result.data.comments.filter((comment) => comment.comment_text),
        lastAudit: result.data.audit[result.data.audit.length - 1],
        firstAudit: result.data.audit[0],
      });
    } else {
      throw new Error(result.message || 'Failed to fetch ticket details');
    }
  } catch (err) {
    console.error('Error fetching ticket details:', err);
    setError(err.message || 'An error occurred while fetching ticket details');
  } finally {
    setIsLoading(false);
  }
};

useEffect(() => {
  fetchTicketDetails();
}, [selectedTicket]);


  if (isLoading) {
    return (
      <div className="p-4 mt-[150px] ml-[60px] flex justify-center">
        <div className="text-center">Loading ticket details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 mt-[100px] ml-[60px] flex justify-center">
        <div className="text-center text-red-600">Error: {error}</div>
      </div>
    );
  }
  const handleSave = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
  
      if (!authToken) {
        console.error('No authentication token found. Please log in again.');
        return;
      }
      
      // Ensure the payload contains only integer IDs
      const payload = {
        user_id: ticketDetails.owner_id,
        ticket_id: ticketDetails.ticket_id,
        assignee_id: ticketDetails.assignee_id,
        ticketcategory_id: selectedcategories, // Convert to integer
        ticketstatus_id: selectedStatus, // Convert to integer
        ticketpriority_id: selectedPriorities, // Convert to integer
      };
  
      const response = await fetch('https://dev.quizifai.com:8010/edit_tkt', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload), // Send the formatted payload
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
  
      // Check if the response contains the "detail" field
      if (result.detail === "This user id is not of admin type.") {
        alert(result.detail); // Display specific error message in an alert
      } else if (result.response === 'success') {
        alert('Ticket updated successfully!');
        setView('main'); // Navigate back to the main view
      } else {
        throw new Error(result.message || 'Failed to update the ticket');
      }
    } catch (error) {
      console.error('Error updating ticket:', error);
      alert('An error occurred while updating the ticket. Please try again.');
    }
  };
  
  
  
  const handleAddComment = async (ticketId) => {
    try {
      const authToken = localStorage.getItem('authToken');

      if (!authToken) {
        console.error('No authentication token found. Please log in again.');
        return;
      }
      const response = await fetch('https://dev.quizifai.com:8010/commentops', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          commenter_id: user_id,
          ticket_id: ticketId,
          addcomment: newComment,
          editcomment_id: 0,
          editcomment: ''
        })
      });
  
      const result = await response.json();
      if (result.response === 'success') {
        // Refresh ticket details
        fetchTicketDetails(ticketId);
        setNewComment('');
      }
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };
  
  const handleEditComment = async (ticketId, commentId) => {
    try {
      const authToken = localStorage.getItem('authToken');

      if (!authToken) {
        console.error('No authentication token found. Please log in again.');
        return;
      }
      const response = await fetch('https://dev.quizifai.com:8010/commentops', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          commenter_id: parseInt(sessionStorage.getItem('user_id')),
          ticket_id: ticketId,
          addcomment: '',
          editcomment_id: commentId,
          editcomment: editComment
        })
      });
  
      const result = await response.json();
      if (result.response === 'success') {
        // Refresh ticket details
        fetchTicketDetails(ticketId);
        setEditingCommentId(null);
        setEditComment('');
      }
    } catch (err) {
      console.error('Error editing comment:', err);
    }
  };

  const stages = ['New', 'In Progress', 'On Hold', 'Resolved', 'Closed', 'Cancelled'];
  const features = [
    'All',
    'Quizzes',
    'Profile',
    'Reports',
    'Configuration',
    'Assign Quiz',
    'Other',
  ];

  
  
 


//   const getStatusColor = (status) => {
//     const colors = {
//       'New': 'bg-blue-100 text-blue-800',
//       'In Progress': 'bg-yellow-100 text-yellow-800',
//       'On Hold': 'bg-orange-100 text-orange-800',
//       'Resolved': 'bg-green-100 text-green-800',
//       'Closed': 'bg-gray-100 text-gray-800',
//       'Cancelled': 'bg-red-100 text-red-800'
//     };
//     return colors[status] || 'bg-gray-100 text-gray-800';
//   };

//   const getFeatureColor = (feature) => {
//     const colors = {
//       'Product Inquiry': 'bg-purple-100 text-purple-800',
//       'Maintenance': 'bg-blue-100 text-blue-800',
//       'Warranty': 'bg-green-100 text-green-800',
//       'Installation': 'bg-yellow-100 text-yellow-800',
//       'Support': 'bg-orange-100 text-orange-800'
//     };
//     return colors[feature] || 'bg-gray-100 text-gray-800';
//   };

// const SearchInput = memo(({ searchTerm, setSearchTerm }) => {
//     return (
//       <input
//         type="text"
//         placeholder="Search tickets..."
//         className="pl-10 pr-4 py-2 border rounded-lg w-64"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
//       />
//     );
//   });

// const SearchInput = memo(({ value, onChange }) => {
//     return (
//       <div className="relative">
//         <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
//         <input
//           type="text"
//           placeholder="Search tickets..."
//           className="pl-10 pr-4 py-2 border rounded-lg w-64"
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//         />
//       </div>
//     );
//   });

const SearchInput = ({ value, onChange }) => {
    const inputRef = useRef(null); // Create a ref for the input element
  
    useEffect(() => {
        
        const shouldFocus = !value && inputRef.current;
        if (shouldFocus) {
          inputRef.current.focus();
        }
      }, []); 
  
    return (
      <div className="relative">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        <input
          type="text"
          ref={inputRef} // Attach the ref to the input element
          placeholder="Search tickets..."
          className="pl-10 pr-4 py-2 border rounded-lg w-64"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  };
  const indexOfLastTicket = currentPage * ticketsPerPage;
    const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
    const totalPages = Math.ceil(tickets.length / ticketsPerPage);

    const Pagination = () => {
        const renderPageNumbers = () => {
            const pageNumbers = [];
            let startPage = Math.max(currentPage - 2, 1);
            let endPage = Math.min(currentPage + 2, totalPages);
    
            if (startPage > 1) {
                pageNumbers.push(1);
                if (startPage > 2) pageNumbers.push('...');
            }
    
            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }
    
            if (endPage < totalPages) {
                if (endPage < totalPages - 1) pageNumbers.push('...');
                pageNumbers.push(totalPages);
            }
    
            return pageNumbers.map((page, index) =>
                page === '...' ? (
                    <span key={index} className="text-[#00008b]">...</span>
                ) : (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(page)}
                        className={`p-2 rounded-lg ${page === currentPage ? 'bg-[#00365E] text-white font-bold' : 'bg-black text-white'}`}
                    >
                        {page}
                    </button>
                )
            );
        };
    
        return (
            <div className="flex justify-center items-center mt-4 mb-4 gap-4">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#00365E] text-white'}`}
                >
                    <ChevronLeft size={20} />
                </button>
                {renderPageNumbers()}
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-black text-white'}`}
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        );
    };
    const handleBack = () => {
      navigate("/configure")
    };
    
    

    const getStatusColor = (status, isVivid = true) => {
      const vividColors = {
        'New': 'bg-blue-100 text-blue-800',
        'In Progress': 'bg-yellow-100 text-yellow-800',
        'On Hold': 'bg-orange-100 text-orange-800',
        'Resolved': 'bg-green-100 text-green-800',
        'Closed': 'bg-gray-100 text-gray-800',
        'Cancelled': 'bg-red-100 text-red-800',
      };
    
      const grayscaleColors = {
        'New': 'bg-gray-300 text-gray-800',
        'In Progress': 'bg-gray-400 text-gray-800',
        'On Hold': 'bg-gray-500 text-gray-800',
        'Resolved': 'bg-gray-600 text-gray-800',
        'Closed': 'bg-gray-700 text-gray-800',
        'Cancelled': 'bg-gray-800 text-gray-100',
      };
    
      return isVivid
        ? vividColors[status] || 'bg-gray-100 text-gray-800'
        : grayscaleColors[status] || 'bg-gray-700 text-gray-100';
    };
    
  
  const getFeatureColor = (feature, isVivid = true) => {
    const vividColors = {
      'Case Management': 'bg-purple-100 text-purple-800',
      'Drafting': 'bg-blue-100 text-blue-800',
      'Citations': 'bg-green-100 text-green-800',
      'Judgements': 'bg-yellow-100 text-yellow-800',
      'Document Verification': 'bg-orange-100 text-orange-800',
      'Ask Nyayah': 'bg-teal-100 text-teal-800',
      'Access-Related Issues': 'bg-pink-100 text-pink-800',
      'Other': 'bg-gray-100 text-gray-800'
    };
  
    const grayscaleColors = {
      'Case Management': 'bg-gray-300 text-gray-800',
      'Drafting': 'bg-gray-400 text-gray-800',
      'Citations': 'bg-gray-500 text-gray-800',
      'Judgements': 'bg-gray-600 text-gray-800',
      'Document Verification': 'bg-gray-700 text-gray-800',
      'Ask Nyayah': 'bg-gray-800 text-gray-100',
      'Access-Related Issues': 'bg-gray-900 text-gray-100',
      'Other': 'bg-gray-100 text-gray-800'
    };
    return isVivid
    ? vividColors[feature] || 'bg-gray-100 text-gray-800'
    : grayscaleColors[feature] || 'bg-gray-700 text-gray-100';

  };

  const filteredTickets = tickets.filter(ticket =>
    ticket.title.toLowerCase().includes(searchInput.toLowerCase()) ||
    ticket.description.toLowerCase().includes(searchInput.toLowerCase()) ||
    ticket.feature.toLowerCase().includes(searchInput.toLowerCase()) ||
    ticket.status.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value); 
  };

//   const handleCreateTicket = (newTicket) => {
//     setTickets([...tickets, newTicket]);
//     setView('main');
//   };
const handleCreateTicket = () => {
    navigate('/HelpDesk');
};



  const CreateView = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [feature, setFeature] = useState(features[1]);
    const [priority, setPriority] = useState(1);

    const handleSubmit = () => {
      const newTicket = {
        id: `#${tickets.length + 1}`,
        title,
        description,
        feature,
        status: 'New',
        priority: Number(priority),
        createdAt: 'Just now',
        lastUpdated: 'Just now',
      };
      handleCreateTicket(newTicket);
    };

    return (
      <div className="p-4 mt-[50px]">
        <h1 className={`text-2xl font-bold text-[#00008b]`}>
          Create New Ticket
        </h1>
        <div className="bg-white p-4 rounded-lg shadow mt-4">
          <div className="mb-4">
            <label className="block font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter ticket title"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter ticket description"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Feature</label>
            <select
              value={feature}
              onChange={(e) => setFeature(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            >
              {features.slice(1).map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="1">Low</option>
              <option value="2">Medium</option>
              <option value="3">High</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setView('main')}
              className="px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className={`px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]`}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    );
  };

  const MainView = () => (
    <div className='flex w-full'>
      <Navigation/>
    <div className="p-4 flex w-full flex-col pt-12">
         <div onClick={handleBack} className=" absolute top-3 right-3 cursor-pointer">
                  <img src={close} alt="" className="w-[25px] h-[25px]" />
                </div>
      <div className="flex justify-between items-center mb-6">
      <h1 className={`text-2xl font-bold text-[#00008b]`}>My Tickets</h1>

        <div className="flex gap-4">
        <button className={`px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]`}
          onClick={handleCreateTicket}>
  <Plus size={20} />
</button>
<button 
  onClick={() => setView('kanban')}
  className={`px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]`}
>
  Kanban View
</button>
          <div className="relative">
          <SearchInput value={searchText} onChange={setSearchText} />

          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
  {/* Card 1 */}
  <div className="bg-white shadow rounded-lg flex flex-col items-center justify-center p-4 w-1/3">
    <h2 
      className={`text-4xl font-bold text-[#00008b]
      `}
    >
      6
    </h2>
    <p className="text-[#00008b]">Total Tickets</p>
  </div>

  {/* Card 2 */}
  <div className="bg-white shadow rounded-lg flex flex-col items-center justify-center p-4 w-1/3">
    <h2 
      className={`text-4xl font-bold text-[#00008b]`}
    >
      2
    </h2>
    <p className="text-[#00008b]">High Priority</p>
  </div>

  {/* Card 3 */}
  <div className="bg-white shadow rounded-lg flex flex-col items-center justify-center p-4 w-1/3">
    <h2 
      className={`text-4xl font-bold text-[#00008b]`}
    >
      1
    </h2>
    <p className="text-[#00008b]">New Tickets</p>
  </div>
</div>


      <div className="mb-6 flex gap-4">
        <div className="relative">
          <select
            className="appearance-none bg-white text-[#00008b] border rounded-lg px-4 py-2 pr-8"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Statuses</option>
            {stages.map(stage => (
              <option key={stage} value={stage}>{stage}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-2.5 text-[#00008b]" size={20} />
        </div>
        <div className="relative">
          <select
            className="appearance-none bg-white border text-[#00008b] rounded-lg px-4 py-2 pr-8"
            value={filterFeature}
            onChange={(e) => setFilterFeature(e.target.value)}
          >
            {features.map(feature => (
              <option key={feature} value={feature}>{feature}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4">
          <div className="space-y-4">
          {tickets
  .filter(ticket => 
    (filterStatus === 'All' || String(ticket.status || '').toLowerCase() === filterStatus.toLowerCase()) &&
    (filterFeature === 'All' || String(ticket.feature || '').toLowerCase() === filterFeature.toLowerCase()) &&
    (searchText === '' || 
      ticket.title.toLowerCase().includes(searchText.toLowerCase()) || 
      ticket.description.toLowerCase().includes(searchText.toLowerCase()) ||
      String(ticket.feature || '').toLowerCase().includes(searchText.toLowerCase()) ||
      String(ticket.status || '').toLowerCase().includes(searchText.toLowerCase()))
  )
              .slice(indexOfFirstTicket, indexOfLastTicket)
              .map(ticket => (
                <div key={ticket.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-[#00008b]">{ticket.id}</span>
                        <h3 className="font-medium text-[#00008b]">{ticket.title}</h3>
                      </div>
                      <p className="text-sm text-[#00008b] mb-2">{ticket.description}</p>
                    </div>
                    <button onClick={() => {
                      setSelectedTicket(ticket);
                      setView('edit');
                    }}>
                      <MoreVertical size={20} />
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className={`px-2 text-[#00008b] py-1 rounded-full text-xs ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                    <span className={`px-2 py-1 text-[#00008b] rounded-full text-xs ${getFeatureColor(ticket.feature)}`}>
                      {ticket.feature}
                    </span>
                    {ticket.priority > 2 && (
                     <span
                     className={`flex items-center  text-[#00008b] gap-1 text-xstext-gray-500`}
                   >
                        <Star size={14} />
                        High Priority
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-2 flex justify-between items-center text-sm text-[#00008b]">
                    <div className="flex items-center gap-4">
                     
                      <span>Created: {ticket.createdAt}</span>
                      <span>Updated: {ticket.lastUpdated}</span>
                    </div>
                 
                  </div>
                </div>
            ))}
          </div>
        </div>
        <Pagination />
      </div>

      {/* <div className="fixed bottom-4 right-4 space-x-2">
      <button 
  onClick={() => setView('kanban')}
  className={`text-white px-4 py-2 rounded-lg ${theme === 'Vivid' ? 'bg-[#00365E]' : 'bg-black'}`}
>
  Kanban View
</button>

      </div> */}
    </div>
    </div>
  );

  const KanbanView = () => (
    <div className='flex w-full'>
      <Navigation/>
   
    <div className="p-4 flex w-full flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-bold text-[#00008b]`}>Kanban Board</h1>
  
        <button 
          onClick={() => setView('main')}
          className={`px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]`}
        >
          Back to My Tickets
        </button>
      </div>
  
      <div className="grid grid-cols-6 gap-4">
        {stages.map(stage => (
          <div
            key={stage}
            className={`p-4 rounded-lg bg-gray-200 `}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(stage)}
          >
            <h3 className={`font-bold mb-4 text-[#00008b]`}>{stage}</h3>
            <div className="space-y-2">
              {tickets.filter(t => t.status === stage).map(ticket => (
                <div
                  key={ticket.id}
                  draggable
                  onDragStart={() => handleDragStart(ticket)}
                  className="bg-white p-2 rounded shadow cursor-move"
                >
                  <p className="font-medium text-[#00008b]">{ticket.title}</p>
                  <p className="text-sm =text-[#00008b]">{ticket.company}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
  

  const EditView = () => (
    <div className="p-4 mt-[150px] ml-[60px]">
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-bold text-[#00008b]`}>
          {ticketDetails ? `Edit Ticket #${ticketDetails.ticket_id}` : 'Edit Ticket'}
        </h1>
  
        <button 
          onClick={() => setView('main')}
          className={`px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]`}
        >
          Back to My Tickets
        </button>
      </div>
  
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              className="w-full p-2 border rounded-lg"
              rows="3"
              value={ticketDetails?.ticket_description || ''}
              onChange={(e) => setTicketDetails(prev => ({
                ...prev,
                ticket_description: e.target.value
              }))}
            />
          </div>
  
          {/* Status and Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select 
                className="w-full p-2 border rounded-lg"
                value={selectedStatus}
                onChange={handleStatusChange}
              >
              {statuses.map(([id, status]) => (
            <option key={id} value={id}>
              {status}
            </option>
          ))}
              </select>
            </div>
  
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select 
                className="w-full p-2 border rounded-lg"
                value={selectedcategories}
                onChange={handleStatuscategories}
              >
                {categories.map(([id, category]) => (
            <option key={id} value={id}>
              {category}
            </option>
          ))}
              </select>
            </div>
          </div>
  
          {/* Owner ID and Owner Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Owner ID</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded-lg"
                value={ticketDetails?.owner_id || ''}
                onChange={(e) => setTicketDetails(prev => ({
                  ...prev,
                  owner_id: e.target.value
                }))}
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium mb-1">Owner Type</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded-lg"
                value={ticketDetails?.owner_type || ''}
                onChange={(e) => setTicketDetails(prev => ({
                  ...prev,
                  owner_type: e.target.value
                }))}
              />
            </div>
          </div>
  
          {/* Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Priority Level</label>
              <select 
                className="w-full p-2 border rounded-lg"
                value={selectedPriorities}
                onChange={handleselectedPriorities}
              >
                {priorities.map(([id, priority]) => (
            <option key={id} value={id}>
              {priority}
            </option>
          ))}
              </select>
            </div>
  
            <div>
              <label className="block text-sm font-medium mb-1">Priority ID</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded-lg"
                value={ticketDetails?.priority_id || ''}
                onChange={(e) => setTicketDetails(prev => ({
                  ...prev,
                  priority_id: e.target.value
                }))}
              />
            </div>
          </div>
  
          {/* Assignee */}
          <div>
            <label className="block text-sm font-medium mb-1">Assignee</label>
            <input 
              type="number" 
              className="w-full p-2 border rounded-lg"
              value={ticketDetails?.assignee_id || ''}
              onChange={(e) => setTicketDetails(prev => ({
                ...prev,
                assignee_id: e.target.value
              }))}
            />
          </div>
  
          {/* Attachments */}
          {ticketDetails?.formattedAttachments?.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-1">Attachments</label>
              <div className="space-y-2">
                {ticketDetails.formattedAttachments.map((attachment, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <a 
                      href={attachment.file_path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {attachment.file_name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
  
   {/* Comments */}
{ticketDetails?.formattedComments?.length > 0 ? (
  <div className="mt-4">
    <label className="block text-sm font-medium text-left mb-2">Comments</label>
    <div className="space-y-3">
      {ticketDetails.formattedComments.map((comment, index) => (
        <div key={index} className="bg-gray-50 text-left rounded-lg p-3">
          {editingCommentId === comment.ticket_comment_id ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
                className="flex-1 border rounded text-left px-3 py-2 text-sm"
                placeholder="Edit your comment..."
              />
              <button
                onClick={() => handleEditComment(ticketDetails.ticket_id, comment.ticket_comment_id)}
                className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditingCommentId(null);
                  setEditComment('');
                }}
                className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <p className="text-sm">{comment.comment_text}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">
                  {formatDate(comment.created_date)}
                </span>
                {comment.commented_user_id === parseInt(sessionStorage.getItem('user_id')) && (
                  <button
                    onClick={() => {
                      setEditingCommentId(comment.ticket_comment_id);
                      setEditComment(comment.comment_text);
                    }}
                    className="text-xs text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
) : (
  <div className="mt-4">
    <label className="block text-sm font-medium text-[#00008b] mb-2">Comments</label>
    <p className="text-sm text-[#00008b]">No comments yet. Be the first to add a comment.</p>
  </div>
)}

{/* Add New Comment */}
<div className="mt-4">
  <div className="flex gap-2">
    <input
      type="text"
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
      className="flex-1 border rounded px-3 py-2 text-sm"
      placeholder="Add a comment..."
    />
    <button
      onClick={() => handleAddComment(ticketDetails.ticket_id)}
      disabled={!newComment.trim()}
      className={`px-4 py-2 rounded text-sm ${
        newComment.trim()
          ? 'bg-blue-500 text-white hover:bg-blue-600'
          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
      }`}
    >
      Add Comment
    </button>
  </div>
</div>

                  
  
          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4">
            <button 
              onClick={() => setView('main')}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className={`px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]`}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  


  const handleDragStart = (ticket) => {
    setDraggedTicket(ticket);
  };

  const handleDrop = (status) => {
    if (draggedTicket) {
      setTickets(tickets.map(ticket =>
        ticket.id === draggedTicket.id ? { ...ticket, status } : ticket
      ));
      setDraggedTicket(null);
    }
  };

  return (
    
    <div className="flex">
          <style>{`
        body {
          background-color: #F5F5F5;
          margin: 0;
          font-family:Open Sans;
          padding: 0;
        }
        .top-bar {
            height: 64px;
            width:screen;
            background-color: #F5F5F5; 
            z-index: 10; 
            position: sticky; 
            top: 0; 
           
          }
      `}</style>
    

      <div className="w-full">
        {/* <TopBar /> */}
        {view === 'main' && <MainView />}
        {view === 'edit' && <EditView />}
        {view === 'kanban' && <KanbanView />}
        {view === 'create' && <CreateView />}
      </div>
    </div>
  );
};


export default MyTickets;
