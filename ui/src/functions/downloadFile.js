import { API_URL } from "../constants.js";


// ___HELPER FUNCTIONS____ 

const getEndpoint = (id, type) => {
    const typeToUse = type === "report" 
        ? "report"
        : "file";
    
    const downloadEndpoint = `${API_URL}/download-file/${id}/${typeToUse}`;
    return downloadEndpoint;
};

const downloadFromResponse = async (res, filename, updateProgress) => {
    const totalContentLength = parseInt(res.headers.get("Content-Length"), 10);
    if (filename && typeof filename === "string") {
        // stream file from server :: 
        const incomingBuffers = [];
        const reader = res.body.getReader();
        let isDone = false, 
            downloadedLength = 0;
        while (isDone === false) {
            const { done, value } = await reader.read();
            isDone = done;
            if (value) {
                incomingBuffers.push(value.buffer);
                downloadedLength += value.length;
                if (totalContentLength && totalContentLength > 0) {
                    const percentage = (downloadedLength / totalContentLength) * 100;
                    updateProgress(Math.ceil(percentage));
                }
            }
        }
        updateProgress(100);

        // get browser to "download" the file :: 
        const url = window.URL.createObjectURL(new Blob(incomingBuffers));
        const anchor = document.createElement("a");
        anchor.setAttribute("href", url);
        anchor.setAttribute("download", filename);
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    } else {
        updateProgress(null);
        throw new Error("Invalid filename or content-length");
    }
};



// exported function for use :: 
export const downloadFile = async ({ 
    id, 
    name, 
    type  
}) => {
    const updateProgress = (progress) => console.log(progress);
    try {
        const downloadUrl = getEndpoint(id, type);
        const response = await fetch(downloadUrl);
        if (response.ok) { 
            await downloadFromResponse(response, name, updateProgress);
        } else {
            updateProgress(null);
            return false;
        }
        return true;
    } catch (err) {
        console.log(err);
        updateProgress(null);
        return false;
    }
};