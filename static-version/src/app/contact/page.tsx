import PageTitle from "../components/PageTitle";
import ContactForm from "../components/ContactForm";

const Contact = () => {
    return (
        <div className="">
            <PageTitle title="Contact" />
            <div className="bg-black rounded-lg p-4">
                <ContactForm />
            </div>
        </div>
    );
};

export default Contact;
