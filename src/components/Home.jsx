import React, {useState, useEffect} from 'react';

const Landing = () => {
    const [articles, setArticles] = useState([]);
    const [section, setSection] = useState('home');
    useEffect(() => {
        let api_key = 'zhTVqkUYCbU5g7t6AVlPemif0Wm8IrkF';
        let url = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${api_key}`;
        fetch(url)
            .then(response =>{ 
                if (response.ok) {
                return response.json()}
            })
            .then(data => {
                console.log("url",url)
                console.log("data",data)
                setArticles(data.results);
            });
    }, []);

    return (
        <div>
            <h1>Home</h1>
        </div>
    );
}

export default Landing;