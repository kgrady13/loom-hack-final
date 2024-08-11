import PagePreview from "../components/PagePreview";
import DetailsForm from "../components/DetailsForm";

function PageTwo({ NextOnClick, PrevOnClick, preview, handleFormData }) {
    return (
        <div className="flex items-stretch">
            <DetailsForm
                NextOnClick={NextOnClick}
                PrevOnClick={PrevOnClick}
                handleFormData={handleFormData}
            />
            <PagePreview preview={preview} />
        </div>
    );
}

export default PageTwo;
