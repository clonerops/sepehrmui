function useBase64toFile() {
    const base64toFile = (base64String: any, filename: any) => {
        try {
            const byteCharacterss = atob(base64String);
            for (let i = 0; i < byteCharacterss.length; i++) {
                const byteCharacters = atob(base64String);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                return new File([byteArray], filename, { type: 'application/octet-stream' });
            };
        } catch (error) {
            return new File([], filename, { type: 'application/octet-stream' });
        }
    };

    return base64toFile;
}

export default useBase64toFile;
