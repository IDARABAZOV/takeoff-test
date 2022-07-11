export const fetchContacts = async () => {
    return fetch("/contacts", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    });
}