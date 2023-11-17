export const dropdownVehicleType = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, name:string }): any => {
            const { name, id } = obj;
            return { value: id, label: name };
        })
    );
};