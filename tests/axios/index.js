let response = fetch("https://api.github.com/users/miletic94")

let data

const handleFetch = () => {
    return response.then(response => response.json())
            .then(res => {
                return res
        })
}

handleFetch().then(res => data = res)