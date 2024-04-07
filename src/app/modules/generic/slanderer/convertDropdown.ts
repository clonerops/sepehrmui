
export const dropdownSlanderer = (data: any) => {
    return (
        data &&
        data?.map((obj: { slandererDescription: string, mobile: string, id: string }): any => {
            const { slandererDescription, mobile,  id } = obj;
            return { value: id, label: `${slandererDescription} - (${mobile})` };
        })
    );
};