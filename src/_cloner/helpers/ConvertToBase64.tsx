export const convertFilesToBase64 = (files: any, setBase64Attachments: any) => {
    const promises: Promise<string>[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      promises.push(convertFileToBase64(file));
    }

    Promise.all(promises)
      .then((base64Results) => {
        setBase64Attachments(base64Results);
      })
      .catch((error) => {
        console.error('Error converting files to Base64:', error);
      });
  };

const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result as string;
        // resolve(result);
        // resolve(result.slice(22));
        resolve(result.substr(result.indexOf(',') + 1));
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };


  export const convertBase64ToFiles = (base64Strings: any, fileNames: any) => {
    const files = [];
    for (let i = 0; i < base64Strings?.length; i++) {
        const base64String = base64Strings[i];
        const byteCharacters = atob(base64String);
        const byteNumbers = new Array(byteCharacters?.length);
        for (let j = 0; j < byteCharacters?.length; j++) {
            byteNumbers[j] = byteCharacters.charCodeAt(j);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const file: any = new Blob([byteArray], { type: 'application/octet-stream' });
        file.name = fileNames[i]; // If you have filenames associated with base64 strings
        files.push(file);
    }
    return files;
};
