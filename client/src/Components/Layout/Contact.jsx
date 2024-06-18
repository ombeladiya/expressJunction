import React, { useState } from 'react'
import './contactus.css'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function Contact() {
    const phoneNumber = '7990845663'; // Replace with your WhatsApp number
    const [message, setmessage] = useState('');
    const [name, setname] = useState('');



    const handleWhatsAppClick = () => {
        if (name === '' || message === '') {
            return toast.error('Plese fill Required field');
        }
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
            `Hi Myself ${name}, ${message}`
        )}`;
        window.open(url, '_blank');
    };
    return (
        <>
            <div className='conatct-us-main-div'>
                <div className="contact-us-page shadow-lg">
                    <h1 className='text-center fs-5 mb-3 fw-bold text-bold'>Contact Us</h1>
                    <form>
                        <input type="text" placeholder="Your Name" onChange={(e) => setname(e.target.value)} required />
                        <textarea placeholder="Your Message" onChange={(e) => setmessage(e.target.value)} required></textarea>
                        <button type="submit" onClick={handleWhatsAppClick}>
                            <i className="fa fa-whatsapp" aria-hidden="true"></i > WhatsApp
                        </button>
                        <p className='mt-3'>OR Email to: <Link to="mailto:landmen@gmail.com" className='underline'>expressjunction@gmail.com</Link></p>
                    </form>
                </div>

            </div>

        </>
    )
}

export default Contact
