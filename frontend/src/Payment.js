import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { title, price, time, url } = location.state || {};
    const [tickets, setTickets] = React.useState(1);

    if (!title || !price || !time || !url) {
        return <div className="container mt-4">Error: Missing movie details</div>;
    }

    const handleTicketsChange = (e) => {
        const value = Math.max(1, parseInt(e.target.value, 10) || 1);
        setTickets(value);
    };

    const handleProceedPayment = () => {
        alert(`Payment successful for ${tickets} tickets!`);
        navigate('/');
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Payment</h2>
            <div id="movie-card-container" className="card shadow-sm">
                <div className="text-center">
                    <img
                        src={url}
                        className="card-img-top"
                        alt={title}
                        style={{
                            width: '300px', 
                            height: '450px', 
                            objectFit: 'cover', 
                            margin: 'auto', 
                        }}
                    />
                </div>
                <div className="card-body">
                    <p className="card-text"><strong>{title}</strong></p>
                    <p className="card-text">Showtime: {time}</p>
                    <div className="form-group">
                        <label htmlFor="tickets">Number of Tickets:</label>
                        <input
                            type="number"
                            id="tickets"
                            className="form-control"
                            value={tickets}
                            onChange={handleTicketsChange}
                            min="1"
                        />
                    </div>
                    <p className="card-text mt-3">Total Price: ${(price * tickets).toFixed(2)}</p>
                    <button className="btn btn-success" onClick={handleProceedPayment}>
                        Proceed to Pay
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Payment;

