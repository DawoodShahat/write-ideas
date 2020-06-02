const fetchData = async (url, data = {}) => {
    const result = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data),
    });

    return await result.json();
}

export default fetchData;