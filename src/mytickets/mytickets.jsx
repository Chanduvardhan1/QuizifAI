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
import { CircularProgress } from "@mui/material";


const MyTickets = () => {
    const navigate = useNavigate();
  const [view, setView] = useState('main');
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 6;
  
  
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
const [kanban, setkanban] = useState(false);
const [step, setstep] = useState(1);
const [activeTicketId, setActiveTicketId] = useState(null);


const handlekanban =() =>{
    setstep(2);
}
const handlekanbanback =() =>{
    setstep(1);
}

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
const [showOptions, setShowOptions] = useState(false);

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
  const [loading, setLoading] = useState(false);

 useEffect(() => {
    const fetchDropdowns = async () => {
      try {
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

        // if (!response.ok) {
        //   throw new Error('Failed to fetch dropdown data');
        // }

        const data = await response.json();

        if (data.response === "success") {
          // Populate state with the received data
          setCategories(data.data.categories);
          setPriorities(data.data.priorities);
          setStatuses(data.data.statuses);
          setAdmins(data.data.admins);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDropdowns();
  }, []);

  const [ownerStats, setOwnerStats] = useState(null);


  const formatDate = (dateString) => {
  if (!dateString) return 'N/A'; 
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString(undefined, options); 
};

  

useEffect(() => {
  const fetchTickets = async () => {
    try {
      setLoading(true); // Show loading state

      const user_id = localStorage.getItem('user_id');
      const authToken = localStorage.getItem('authToken');

      // Check if authToken and user_id are available
      if (!authToken) {
        console.error('No authentication token found. Please log in again.');
        return;
      }

      if (!user_id) {
        throw new Error('User ID not found in local storage');
      }

      const url = `https://dev.quizifai.com:8010/view_tkt?ownerid=${user_id}`;

      // API request
      const response = await fetch(url, {
        method: 'POST', // Update this to 'GET' if your API requires a GET request
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: null, // Remove this line if the API doesn't need a request body
      });

      // Handle non-OK responses
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }

      const result = await response.json();
      console.log('Fetched Tickets Response:', result);

      // Handle successful response
      if (result.response === 'success') {
        setOwnerStats(result.data.owner_stats);
        const transformedTickets = result.data.tickets.map(ticket => ({
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

      // Fallback data for development
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
      setLoading(false); // Hide loading spinner
    }
  };

  fetchTickets();
}, []);

// useEffect(() => {
//   const fetchTickets = async () => {
//     try {
//       setLoading(true);

//       const user_id = localStorage.getItem('user_id');
//       const authToken = localStorage.getItem('authToken');

//       if (!authToken) {
//         console.error('No authentication token found. Please log in again.');
//         return;
//       }

//       if (!user_id) {
//         throw new Error('User ID not found in session storage');
//       }

//       const url = `https://dev.quizifai.com:8010/view_tkt?ownerid=${user_id}`;

//             const response = await fetch(url, {
//               method: 'POST', // Change to 'GET' if the API doesn't require POST
//               headers: {
//                 'Accept': 'application/json',
//                 'Authorization': `Bearer ${authToken}`,
//               },
//               body: null, // Remove if the API doesn't require a request body
//             });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
//       }

//       const result = await response.json();
//       console.log('Fetched Tickets Response:', result);

//       if (result.response === 'success') {
//         if (Array.isArray(result.data)) {
//           const transformedTickets = result.data.map(ticket => ({
//             id: `#${ticket.ticket_id}`,
//             title: `Ticket ${ticket.ticket_id}`,
//             description: ticket.ticket_description || 'No description provided',
//             feature: ticket.category || 'Other',
//             status: ticket.status || 'New',
//             priority: ticket.priority_level || 1,
//             createdAt: formatDate(ticket.audit?.[0]?.created_date) || 'Unknown',
//             lastUpdated: formatDate(ticket.audit?.[ticket.audit.length - 1]?.created_date) || 'Unknown',
//             attachments: ticket.attachments?.filter(att => att.file_name) || [],
//             comments: ticket.comments?.filter(comment => comment.comment_text) || [],
//             assignedTo: ticket.assignedto_id,
//           }));
//           setTickets(transformedTickets);
//         }

//         // Set owner stats
//         if (result.owner_stats) {
//           setOwnerStats(result.owner_stats);
//         } else {
//           console.warn('Owner stats not available in the response.');
//         }
//       } else {
//         throw new Error('Invalid data format received from API.');
//       }
//     } catch (err) {
//       console.error('Error fetching tickets:', err);
//       setError(err.message);

//       if (process.env.NODE_ENV === 'development') {
//         setTickets([
//           {
//             id: '#1',
//             title: 'Sample Ticket',
//             description: 'This is a fallback ticket for testing',
//             feature: 'Other',
//             status: 'New',
//             priority: 1,
//             createdAt: '1 day ago',
//             lastUpdated: 'Just now',
//           },
//         ]);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchTickets();
// }, []);


const fetchTicketDetails = async () => {
  if (!selectedTicket) return;

  try {
    setLoading(true); 
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
    setLoading(false); // Hide loading after API response
  }
};

useEffect(() => {
  fetchTicketDetails();
}, [selectedTicket]);


  // if (isLoading) {
  //   return (
  //     <div className="p-4 mt-[150px] ml-[60px] flex justify-center">
  //       <div className="text-center">Loading ticket details...</div>
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div className="p-4 mt-[100px] ml-[60px] flex justify-center">
        <div className="text-center text-red-600">Error: {error}</div>
      </div>
    );
  }
  const handleSave = async () => {
    try {
      setLoading(true); 
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
    }finally {
      setLoading(false); // Hide loading after API response
    }
  };
  
  
  
  const handleAddComment = async (ticketId) => {
    try {
      setLoading(true); 

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
    }finally {
      setLoading(false); // Hide loading after API response
    }
  };
  
  const handleEditComment = async (ticketId, commentId) => {
    try {
      setLoading(true); 

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
    }finally {
      setLoading(false); // Hide loading after API response
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
                        className={`w-5 h-5 rounded border text-xs font-medium ${page === currentPage ? 'bg-[#00365E] text-white font-bold' : 'bg-black text-white'}`}
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
                    className={`w-5 h-5 rounded border ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#00365E] text-white'}`}
                >
                    <ChevronLeft size={20} />
                </button>
                {renderPageNumbers()}
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`w-5 h-5 rounded border ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-black text-white'}`}
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

const handleEditClick = (ticket) => {
    setSelectedTicket(ticket); // Set the selected ticket
    setstep(3); // Move to step 3
  };
  const handleOptions = (ticketId) => {
    setActiveTicketId((prevId) => (prevId === ticketId ? null : ticketId));
  };

  return (
    <div className='flex'>
        <Navigation/>

        {step === 1 && (
           
 <div className='flex flex-col w-full'>
   {loading && (
            <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
              <CircularProgress size={40} color="primary" />
            </div>
          )}
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
   onClick={handlekanban}
   className={`px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]`}
 >
   Kanban View
 </button>
           <div className="relative">
           <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
           <input
           type="text"
           placeholder="Search tickets..."
           className="pl-10 pr-4 py-2 border-[2px] border-[#8cd18e] rounded-lg w-64"
           value={searchText}
           onChange={(e) => setSearchText(e.target.value)}
         />
           </div>
         </div>
       </div>
       {ownerStats && (
       <div className="flex gap-4 mb-6">
   {/* Card 1 */}
   <div className="bg-white shadow rounded-lg flex flex-col items-center border-[2px] border-[#8cd18e] justify-center p-4 w-1/3">
     <h2 
       className={`text-4xl font-bold text-[#00008b]
       `}
     >
       {ownerStats.total_tickets}
     </h2>
     <p className="text-[#00008b]">Total Tickets</p>
   </div>
 
   {/* Card 2 */}
   <div className="bg-white shadow rounded-lg flex flex-col items-center border-[2px] border-[#8cd18e] justify-center p-4 w-1/3">
     <h2 
       className={`text-4xl font-bold text-[#00008b]`}
     >
       {ownerStats.high_priority_tickets}
     </h2>
     <p className="text-[#00008b]">High Priority</p>
   </div>
 
   {/* Card 3 */}
   <div className="bg-white shadow rounded-lg flex flex-col items-center border-[2px] border-[#8cd18e] justify-center p-4 w-1/3">
     <h2 
       className={`text-4xl font-bold text-[#00008b]`}
     >
       {ownerStats.new_tickets}
     </h2>
     <p className="text-[#00008b]">New Tickets</p>
   </div>
 </div>
 
       )}
       <div className="mb-6 flex gap-4">
         <div className="relative">
           <select
             className="appearance-none bg-white text-[#00008b] border-[2px] border-[#8cd18e] rounded-lg px-4 py-2 pr-8"
             value={filterStatus}
             onChange={(e) => setFilterStatus(e.target.value)}
           >
             <option value="All">Status</option>
             {stages.map(stage => (
               <option key={stage} value={stage}>{stage}</option>
             ))}
           </select>
           <ChevronDown className="absolute right-2 top-2.5 text-[#00008b]" size={20} />
         </div>
         <div className="relative">
           <select
             className="appearance-none bg-white  text-[#00008b] border-[2px] border-[#8cd18e] rounded-lg px-4 py-2 pr-8"
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
 
       
           <div className="flex flex-wrap gap-[23px]">
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
                 <div key={ticket.id}  className="border-[2px] w-[32%] border-[#8cd18e] flex-wrap rounded-lg p-4 hover:bg-gray-50">
                   <div className="flex justify-between items-start mb-2">
                     <div>
                       <div className="flex items-center gap-2 mb-1">
                         <span className="font-medium text-[#00008b]">{ticket.id}</span>
                         <h3 className="font-medium text-[#00008b]">{ticket.title}</h3>
                       </div>
                       <p className="text-sm text-[#00008b] mb-2">{ticket.description}</p>
                     </div>
                     <div className="relative">
  <button
    className="hover:rounded-full p-2 hover:bg-gray-100"
    onClick={() => handleOptions(ticket.id)} // Set activeTicketId to the clicked ticket's ID
  >
    <MoreVertical size={20} />
  </button>
  {activeTicketId === ticket.id && (
    <div
      className="absolute top-2 right-2  rounded-md w-[150px] flex flex-col p-1 bg-gray-200 shadow-lg"
      style={{
        clipPath:
          "polygon(0% 0%, 80% 0, 80% 8%, 95% 15%, 81% 23%, 80% 100%, 0 100%)",
      }}
    >
      <button
        onClick={() => handleEditClick(ticket)}
        className="block w-full text-left px-2 py-2 hover:bg-gray-100"
      >
        Edit
      </button>
    </div>
  )}
</div>

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
         
         <Pagination />
 
     
     </div>
         </div>
        )}
       

{step ===2 && (
        <div className="p-4 flex w-full flex-col">
           {loading && (
            <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
              <CircularProgress size={40} color="primary" />
            </div>
          )}
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-2xl font-bold text-[#00008b]`}>Kanban Board</h1>
    
          <button 
            onClick={handlekanbanback}
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
)}
 {step === 3 && (
     <div className="p-4 w-full">
       {loading && (
            <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
              <CircularProgress size={40} color="primary" />
            </div>
          )}
     <div className="flex justify-between items-center mb-6">
       <h1 className={`text-2xl font-bold text-[#00008b]`}>
         {ticketDetails ? `Edit Ticket #${ticketDetails.ticket_id}` : 'Edit Ticket'}
       </h1>
 
       <button 
         onClick={() => setstep(1)}
         className={`px-[20px] p-[5px] bg-[#3B61C8] text-white font-semibold rounded-[10px] hover:bg-[#3B61C8]`}
       >
         Back to My Tickets
       </button>
     </div>
 
     <div className="bg-white rounded-lg shadow p-6">
      
<div className="space-y-4">
<div className='flex gap-[5px]'>
       <div className="flex flex-col w-full">
               <div className="w-full flex flex-row">
               <label className="w-[22%] text-blue-800 font-semibold mb-2 mr-[5px] ">Status</label>
               <select
         
                  className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                  value={selectedStatus}
                  onChange={handleStatusChange}
        >
          <option value="" disabled>Institations</option>
          {statuses.map(([id, status]) => (
           <option key={id} value={id}>
             {status}
           </option>
         ))}
        </select>
         
               </div>
             
               <hr className={`h-[1px] w-full`} />
             </div>
             <div className="w-full flex flex-col">
               <div className="w-full flex flex-row">
               <label className="w-[22%] text-blue-800 font-semibold mb-2 mr-[9px] ">Priority Level<span className="text-red-500"></span></label>
               <select
        
                  className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                  value={selectedPriorities}
                  onChange={handleselectedPriorities}
        >
          <option> Select Priority
          </option>
          {/* <option value="" disabled> selete Priority </option> */}
          {priorities.map(([id, priority]) => (
           <option key={id} value={id}>
             {priority}
           </option>
         ))}
        </select>
         
         
               </div>
             
               <hr className={`h-[1px] w-full`} />
             </div>
             </div>
       <div className='flex gap-[5px]'>
       
       
             <div className="w-full flex flex-col">
               <div className="w-full flex flex-row">
               <label className="w-[22%] text-blue-800 font-semibold mb-2 mr-[9px] ">Category<span className="text-red-500"></span></label>
               <select
         
                  className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                  value={selectedcategories}
               onChange={handleStatuscategories}
        >
          {/* <option value="" disabled>Institations</option> */}
          <option> Select category
           </option>
          {categories.map(([id, category]) => (
           <option key={id} value={id}>
             {category}
           </option>
         ))}
        </select>
         
               </div>
             
               <hr className={`h-[1px] w-full`} />
             </div>
             <div className="w-full flex flex-col">
               <div className="w-full flex flex-row">
               <label className="w-[22%] text-blue-800 font-semibold mb-2 mr-[9px] ">Owner ID<span className="text-red-500"></span></label>
               <input
                     type="text"
                     className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                       placeholder="Owner ID..."
                       value={ticketDetails?.owner_id || ''}
               onChange={(e) => setTicketDetails(prev => ({
                 ...prev,
                 owner_id: e.target.value
               }))}
                     ></input>
         
               </div>
             
               <hr className={`h-[1px] w-full`} />
             </div>
       
             </div>
             

             <div className='flex gap-[5px]'>
       
       
             <div className="w-full flex flex-col">
               <div className="w-full flex flex-row">
               <label className="w-[22%] text-blue-800 font-semibold mb-2 mr-[9px] ">Priority ID<span className="text-red-500"></span></label>
               <input
                     type="text"
                     className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                       placeholder="Priority ID..."
                       value={ticketDetails?.priority_id || ''}
                       onChange={(e) => setTicketDetails(prev => ({
                         ...prev,
                         priority_id: e.target.value
                       }))}
                     ></input>
         
               </div>
             
               <hr className={`h-[1px] w-full`} />
             </div>
             <div className="w-full flex flex-col">
               <div className="w-full flex flex-row">
               <label className="w-[22%] text-blue-800 font-semibold mb-2 mr-[9px] ">Assignee<span className="text-red-500"></span></label>
               <input
                     type="text"
                     className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                       placeholder="Assignee..."
                       value={ticketDetails?.assignee_id || ''}
                       onChange={(e) => setTicketDetails(prev => ({
                         ...prev,
                         assignee_id: e.target.value
                       }))}
                     ></input>
         
         
               </div>
             
               <hr className={`h-[1px] w-full`} />
             </div>
             </div>

             <div className='flex gap-[5px]'>
       
       
             <div className="w-full flex flex-col">
               <div className="w-full flex flex-row">
               <label className="w-[22%] text-blue-800 font-semibold mb-2 mr-[9px] ">Owner Type<span className="text-red-500"></span></label>
               <input
                     type="text"
                     className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                       placeholder="Owner Type..."
                       value={ticketDetails?.owner_type || ''}
               onChange={(e) => setTicketDetails(prev => ({
                 ...prev,
                 owner_type: e.target.value
               }))}
                     ></input>
         
               </div>
             
               <hr className={`h-[1px] w-full`} />
             </div>
             <div className="flex flex-col w-full">
               <div className="w-full flex flex-row">
               <label className="w-[22%] text-blue-800 font-semibold mb-2 mr-[5px] ">Description</label>
               <textarea
                     type="text"
                     className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                       placeholder="Description..."
                       value={ticketDetails?.ticket_description || ''}
                       onChange={(e) => setTicketDetails(prev => ({
                         ...prev,
                         ticket_description: e.target.value
                       }))}
                     ></textarea>
         
               </div>
             
               <hr className={`h-[1px] w-full`} />
             </div>
       
             </div>
             

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
            <div className="w-full flex flex-col">
               <div className="w-full flex flex-row">
               <label className="w-[10%] text-blue-800 font-semibold mb-2 mr-[9px] ">EditComment<span className="text-red-500"></span></label>
               <input
                     type="text"
                     className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                       placeholder="Organization Address Line2"
                       value={editComment}
                       onChange={(e) => setEditComment(e.target.value)}
                     ></input>
         
               </div>
             
               <hr className={`h-[1px] w-full`} />
             </div>
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
 <div className="w-full flex flex-col">
               <div className="w-full flex flex-row">
               <label className="w-[10%] text-blue-800 font-semibold mb-2 mr-[9px] ">Comments<span className="text-red-500"></span></label>
               <input
                     type="text"
                     className={ ` w-full border-transparent border-b-2 bg-[#f5f5f5] hover:border-blue-200 text-[11px] focus:outline-none `}
                       placeholder="Add a comment..."
                       value={newComment}
     onChange={(e) => setNewComment(e.target.value)}
                     ></input>
         
               </div>
             
               <hr className={`h-[1px] w-full`} />
             </div>
   <button
     onClick={() => handleAddComment(ticketDetails.ticket_id)}
     disabled={!newComment.trim()}
     className={`px-4 py-2 w-[15%] rounded text-sm ${
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
)}
    </div>
  );
};


export default MyTickets;
