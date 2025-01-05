
interface PageTitleProps {
    title: string;
}

const PageTitle = ({title}: PageTitleProps) => {
    return(
        <div className="mb-6 text-4xl font-semibold">{title}</div>
    );
}

export default PageTitle;
