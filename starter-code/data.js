const fetchData = (event) => {
    event.preventDefault()
    let username = event.target.elements["username"].value !== "" ?
                   event.target.elements["username"].value  : 
                   "octacat"
        
    let url = `https://api.github.com/users/${username}`
    fetch(url)
        .then(result => result.json())
        .then(data => handleData(data))
        .catch(err => console.log(err))
}

const handleData = (data) => {
    const handleDate = (date) => {
        let d = new Date(date)
        console.log(d)
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
        return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
      }
    let VirtualDOM = {
        avatar: data.avatar_url,
        name: data.name || data.login,
        username: `@${data.login}`,
        joined: handleDate(data.created_at),
        bio: data.bio || "This profile has no bio",
        repos: data.public_repos,
        followers: data.followers,
        following: data.following,
        location: data.location || "Not Available",
        twitter: data.twitter_username ? `https://www.twitter.com/${data.twitter_username}` : "Not Available",
        blog: data.blog || "Not Available",
        organization: data.company ? `https://www.github.com/${data.company}` : "Not Available",
    }
    for (element in VirtualDOM) {
        document.querySelector(`#${element}`)
    }
}
