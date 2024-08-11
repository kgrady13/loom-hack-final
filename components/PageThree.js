import SharePreview from "../components/SharePreview";
import SharePage from "../components/SharePage";

function PageThree({formData}) {
    return (
        <div className="flex items-stretch">
            <SharePage formData={formData} />
            <SharePreview formData={formData} />
        </div>
    );
}

export default PageThree;
