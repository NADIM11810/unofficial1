import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '../../Context/AuthContext';
import Marquee from 'react-fast-marquee';

const Roshid = () => {
    const { balance } = useAuthContext();
    const [Balance, setBalance] = useState({});
    console.log(balance);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await fetch('/api/balance');
                const data = await response.json();
                setBalance(data);
            } catch (error) {
                console.error('Error fetching balance:', error.message);
            }
        };
        fetchBalance();
    }, []);
    console.log(Balance);
    const [formData, setFormData] = useState({
        bangladeshFormNo: '',
        attachment: '',
        serialNumber: '',
        paragraphNumber: '',
        landOfficeName: '',
        mouzaJLNo: '',
        upazilaThana: '',
        district: '',
        ownerEntries: [{ ownerName: '', ownerShare: '' }],
        arrearLastThreeYears: '',
        arrearPastThreeYears: '',
        interestAndCompensation: '',
        currentClaim: '',
        totalClaim: '',
        totalCollection: '',
        totalArrear: '',
        totalInWords: '',
        noteBl: '',
        challanNo: '',
        dateBangla: '',
        dateEnglish: '',
        landEntries: [{ landCategory: '', landArea: '', plotNo: '' }],
        khatianNo: '',
        holdingNumber: ''
    });

    const handleChange = (e, index, type) => {
        const { name, value } = e.target;
        if (type === 'landEntries' || type === 'ownerEntries') {
            const newData = [...formData[type]];
            newData[index][name] = value;
            setFormData({ ...formData, [type]: newData });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleAddEntry = (type) => {
        setFormData({
            ...formData,
            [type]: [...formData[type], {}]
        });
    };

    const handleRemoveEntry = (index, type) => {
        const newData = [...formData[type]];
        newData.splice(index, 1);
        setFormData({
            ...formData,
            [type]: newData
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (balance<Balance.roshidBalance) {
            toast.error('আপনার একাউন্টে যথেষ্ট টাকা নেই। অনুগ্রহ করে আপনার একাউন্টে যথেষ্ট টাকা যোগ করুন।');
        } else {
            try {
                const response = await fetch('/api/roshid', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                const data = await response.json();
                if (response.ok) {
                    fetch('/api/users/update-balance-roshid', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                        .then((response) => response.json())
                        .then((da) => {
                            toast.success('Roshid form submitted successfully');
                            console.log(data._id);
                            window.location.href = `https://ldtax.gov.bd.ldtaxgov.xyz/dakhil/${data._id}`;
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                            toast.error('Something went wrong!');
                        });
    
                } else {
                    toast.error('Failed to submit Roshid form');
                }
            } catch (error) {
                console.error('Error submitting Roshid form:', error.message);
                alert('Failed to submit Roshid form');
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">রশিদ Form</h2>
            <Marquee>
                <h2 className="text-xl font-bold mb-4">💢আপনার একাউন্ট থেকে {Balance.roshidBalance}tk কেটে নেয়া হবে ।💢</h2>
            </Marquee>
            <form onSubmit={handleSubmit} className="w-full mx-auto">
                <div className='grid gap-10 grid-cols-1 md:grid-cols-1 lg:grid-cols-2'>
                    <div>
                        <h2 className="text-lg font-bold mb-2">সাধারণ তথ্য (General Information):</h2>
                        <div className="mb-4">
                            <label htmlFor="bangladeshFormNo" className="block mb-1">বাংলাদেশ ফরম নং</label>
                            <input type="text" id="bangladeshFormNo" name="bangladeshFormNo" value={formData.bangladeshFormNo} onChange={(e) => handleChange(e, null, null)} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="attachment" className="block mb-1">পরিশিষ্ট (বাংলায়)</label>
                            <input type="text" id="attachment" name="attachment" value={formData.attachment} onChange={(e) => handleChange(e, null, null)} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="serialNumber" className="block mb-1">ক্রমিক নং (বাংলায়)</label>
                            <input type="text" id="serialNumber" name="serialNumber" value={formData.serialNumber} onChange={(e) => handleChange(e, null, null)} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="paragraphNumber" className="block mb-1">অনুচ্ছেদ নং (বাংলায়)</label>
                            <input type="text" id="paragraphNumber" name="paragraphNumber" value={formData.paragraphNumber} onChange={(e) => handleChange(e, null, null)} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="landOfficeName" className="block mb-1">ভূমি অফিসের নাম (বাংলায়)</label>
                            <input type="text" id="landOfficeName" name="landOfficeName" value={formData.landOfficeName} onChange={(e) => handleChange(e, null, null)} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="mouzaJLNo" className="block mb-1">মৌজার জে. এল. নং (বাংলায়)</label>
                            <input type="text" id="mouzaJLNo" name="mouzaJLNo" value={formData.mouzaJLNo} onChange={(e) => handleChange(e, null, null)} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="upazilaThana" className="block mb-1">উপেজলা / থানা (বাংলায়)</label>
                            <input type="text" id="upazilaThana" name="upazilaThana" value={formData.upazilaThana} onChange={(e) => handleChange(e, null, null)} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="district" className="block mb-1">জেলা (বাংলায়)</label>
                            <input type="text" id="district" name="district" value={formData.district} onChange={(e) => handleChange(e, null, null)} className="w-full border rounded px-2 py-1" />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold mb-2">আদায়ের বিবরণ (Payment Details):</h2>
                        <div className="mb-4">
                            <label htmlFor="arrearLastThreeYears" className="block mb-1">তিন বৎসরের ঊর্ধ্বের বকেয়া (বাংলায়)</label>
                            <input type="text" id="arrearLastThreeYears" name="arrearLastThreeYears" value={formData.arrearLastThreeYears} onChange={(e) => handleChange(e, null, null)} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="arrearPastThreeYears" className="block mb-1">গত তিন বছরের বকেয়া (বাংলায়)</label>
                            <input type="text" id="arrearPastThreeYears" name="arrearPastThreeYears" value={formData.arrearPastThreeYears} onChange={(e) => handleChange(e, null, null)} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="interestAndCompensation" className="block mb-1">বকেয়ার সুদ ও ক্ষতিপূরণ (বাংলায়)</label>
                            <input type="text" id="interestAndCompensation" name="interestAndCompensation" value={formData.interestAndCompensation} onChange={(e) => handleChange(e, null, null)} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="currentClaim" className="block mb-1">হাল দাবি (বাংলায়)</label>
                            <input type="text" id="currentClaim" name="currentClaim" value={formData.currentClaim} onChange={(e) => handleChange(e, null, null)} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="totalClaim" className="block mb-1">মোট দাবি (বাংলায়)</label>
                            <input type="text" id="totalClaim" name="totalClaim" value={formData.totalClaim} onChange={(e) => handleChange(e, null, null)} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="totalCollection" className="block mb-1">মোট আদায় (বাংলায়)</label>
                            <input type="text" id="totalCollection" name="totalCollection" value={formData.totalCollection} onChange={(e) => handleChange(e, null, null)} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="totalArrear" className="block mb-1">মোট বকেয়া (বাংলায়)</label>
                            <input type="text" id="totalArrear" name="totalArrear" value={formData.totalArrear} onChange={(e) => handleChange(e, null, null)} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="totalInWords" className="block mb-1">সর্বমোট (কথায়) (বাংলায়)</label>
                            <input type="text" id="totalInWords" name="totalInWords" value={formData.totalInWords} onChange={(e) => handleChange(e, null, null)} className="w-full border rounded px-2 py-1" />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold mb-2">জমির বিবরণ (Land Details):</h2>
                        {formData.landEntries.map((entry, index) => (
                            <div key={index} className="mb-4">
                                <div className="mb-4">
                                    <label htmlFor="landCategory" className="block mb-1">জমির শ্রেণী (বাংলায়)</label>
                                    <input type="text" id="landCategory" name="landCategory" value={formData.landEntries[index].landCategory} onChange={(e) => handleChange(e, index, 'landEntries')} className="w-full border rounded px-2 py-1" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="landArea" className="block mb-1">জমির পরিমাণ (বাংলায়)</label>
                                    <input placeholder='জমির পরিমান[০.০০০০০ এই ফরমেট অনুসারে জমির পরিমান দিবেন, উদাহরন ১ শতক হলে ১.০০০০০]' type="text" id="landArea" name="landArea" value={formData.landEntries[index].landArea} onChange={(e) => handleChange(e, index, 'landEntries')} className="w-full border rounded px-2 py-1" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="plotNo" className="block mb-1">দাগ নং (বাংলায়)</label>
                                    <input type="text" id="plotNo" name="plotNo" value={formData.landEntries[index].plotNo} onChange={(e) => handleChange(e, index, 'landEntries')} className="w-full border rounded px-2 py-1" />
                                </div>
                                {/* Add more fields as needed */}
                                <button type="button" onClick={() => handleRemoveEntry(index, 'landEntries')} className="bg-red-500 text-white px-2 py-1 rounded ml-2">Remove</button>
                            </div>
                        ))}
                        <button type="button" onClick={() => handleAddEntry('landEntries')} className="bg-green-500 text-white px-2 py-1 rounded">Add Land Entry</button>
                        <br />
                        <div className="mb-4">
                            <label htmlFor="khatianNo" className="block mb-1">খতিয়ান নং (বাংলায়)</label>
                            <input type="text" id="khatianNo" name="khatianNo" value={formData.khatianNo} onChange={(e) => handleChange(e, null, null)} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="holdingNumber" className="block mb-1">২ নং রেজিস্টার অনুযায়ী হোল্ডিং নাম্বার</label>
                            <input type="text" id="holdingNumber" name="holdingNumber" value={formData.holdingNumber} onChange={(e) => handleChange(e, null, null)} className="w-full border rounded px-2 py-1" />
                        </div>

                    </div>
                    <div>
                        <h2 className="text-lg font-bold mb-2">মালিকের তথ্য (Owner Information):</h2>
                        {formData.ownerEntries.map((entry, index) => (
                            <div key={index} className="mb-4">
                                <div className="mb-4">
                                    <label htmlFor="ownerName" className="block mb-1">মালিকের নাম (বাংলায়)</label>
                                    <input type="text" id="ownerName" name="ownerName" value={formData.ownerEntries[index].ownerName} onChange={(e) => handleChange(e, index, 'ownerEntries')} className="w-full border rounded px-2 py-1" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="ownerShare" className="block mb-1">মালিকের ভাগ (বাংলায়)</label>
                                    <input placeholder='মালিকের ভাগ[০.০০০০০ এই ফরমেট অনুসারে মালিকের ভাগ দিবেন, উদাহরন ১ শতক হলে ১.০০০০০]' type="text" id="ownerShare" name="ownerShare" value={formData.ownerEntries[index].ownerShare} onChange={(e) => handleChange(e, index, 'ownerEntries')} className="w-full border rounded px-2 py-1" />
                                </div>
                                {/* Add more fields as needed */}
                                <button type="button" onClick={() => handleRemoveEntry(index, 'ownerEntries')} className="bg-red-500 text-white px-2 py-1 rounded ml-2">Remove</button>
                            </div>
                        ))}
                        <button type="button" onClick={() => handleAddEntry('ownerEntries')} className="bg-green-500 text-white px-2 py-1 rounded">Add Owner Entry</button>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold mb-2">অতিরিক্ত (Additional):</h2>
                        <div className="mb-4">
                            <label htmlFor="noteBl" className="block mb-1">নোট (বাংলায়)</label>
                            <input type="text" id="noteBl" name="noteBl" value={formData.noteBl} onChange={(e) => handleChange(e, null, null)} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="challanNo" className="block mb-1">চালান নং (বাংলায়)</label>
                            <input type="text" id="challanNo" name="challanNo" value={formData.challanNo} onChange={(e) => handleChange(e, null, null)} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="dateBangla" className="block mb-1">তারিখ (বাংলা) (বাংলায়)</label>
                            <input type="text" id="dateBangla" name="dateBangla" value={formData.dateBangla} onChange={(e) => handleChange(e, null, null)} className="w-full border rounded px-2 py-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="dateEnglish" className="block mb-1">তারিখ (ইংলিশ)</label>
                            <input type="text" id="dateEnglish" name="dateEnglish" value={formData.dateEnglish} onChange={(e) => handleChange(e, null, null)} className="w-full border rounded px-2 py-1" />
                        </div>
                    </div>

                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Submit</button>
            </form>
        </div>
    );
};

export default Roshid;
