import { DownloadFileJPEG, DownloadFileJPG, DownloadFilePNG } from "./downloadFiles";

var signatures: any = {
    JVBERi0: "application/pdf",
    R0lGODdh: "image/gif",
    R0lGODlh: "image/gif",
    iVBORw0KGgo: "image/png",
    "/9j/": "image/jpg"
};

function detectMimeType(b64: any) {
    for (var s in signatures) {
        if (b64.indexOf(s) === 0) {
            return signatures[s];
        }
    }
}

export const downloadAttachments = (data: any) => {
    if (data?.length === 0) {
        alert("فایلی برای دانلود وجود ندارد")
    } else {
        data?.forEach((element: any) => {
            switch (detectMimeType(element.fileData)) {
                case "image/png":
                    const outputFilenamePng = `filesattachments${Date.now()}.png`;
                    DownloadFilePNG(element.fileData, outputFilenamePng)
                    break;
                case "image/jpg":
                    const outputFilenameJpg = `filesattachments${Date.now()}.jpg`;
                    DownloadFileJPG(element.fileData, outputFilenameJpg)
                    break;
                case "image/jpeg":
                    const outputFilenameJpeg = `filesattachments${Date.now()}.jpeg`;
                    DownloadFileJPEG(element.fileData, outputFilenameJpeg)
                    break;

                default:
                    break;
            }
        });
    }
};
