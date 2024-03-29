import { format } from 'date-fns';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
// import { format } from 'date-fns';

const BookingModal = ({ treatment, date, setTreatment, refetch }) => {
    const [user] = useAuthState(auth);
    const { _id, name, slots, price } = treatment;
    const formateDate = format(date, 'PP');
    const handleBooking = e => {
        e.preventDefault();
        const slot = e.target.slot.value;
        const booking = {
            treatmentId: _id,
            treatment: name,
            date: formateDate,
            slot,
            price,
            patient: user.email,
            patientName: user.displayName,
            phone: e.target.phone.value
        }
        // insert data
        fetch('https://doctors-portal-server-arburhan.vercel.app/booking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                // close modal
                if (data.success) {
                    refetch();
                    setTreatment(null);
                    toast(`Appointment is set ${formateDate} at ${slot}`);
                }
                else {
                    toast.error(`already book an appointment on ${data.booking?.date} at ${data.booking?.slot}`);

                }
            })
    }
    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg text-secondary">Booking for: {name}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-4 justify-items-center my-3'>
                        <input type="text" value={format(date, 'PP')} className="input input-bordered w-full max-w-xs" disabled />
                        <select name='slot' className="select select-bordered w-full max-w-xs">
                            {
                                slots.map((slot, index) =>
                                    <option key={index} value={slot}>{slot}</option>
                                )
                            }
                        </select>
                        <input type="name" disabled defaultValue={user?.displayName || ''} className="input input-bordered w-full max-w-xs" />
                        <input type="email" disabled defaultValue={user?.email || ''} className="input input-bordered w-full max-w-xs" />
                        <input type="phone" name='phone' placeholder="Phone Number" required className="input input-bordered w-full max-w-xs" />
                        <input type="Submit" defaultValue="SUBMIT" className="btn btn-accent text-white w-full max-w-xs" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;