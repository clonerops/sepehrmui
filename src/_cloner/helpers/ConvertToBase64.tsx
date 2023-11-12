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
        resolve(result.slice(22));
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };
