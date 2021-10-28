function App() {
    const [tweets, setTweets] = React.useState([
        {
            id: 0,
            icon: "🐤",
            displayName: "ひよこちゃん",
            accountName: "hiyokochan",
            content: "ピヨピヨサンダル"
        },
        {
            id: 2,
            icon: "🐤",
            displayName: "ひよこちゃん",
            accountName: "hiyokochan",
            content: "ピヨピヨサンダル"
        },
        {
            id: 3,
            icon: "🐤",
            displayName: "ひよこちゃん",
            accountName: "hiyokochan",
            content: "ピヨピヨサンダル"
        }
    ]);

    const addTweet = React.useCallback((tweet) => setTweets((prev) => [tweet, ...prev]), [setTweets]);

    return (
        <div>
            <TweetInput addTweet={addTweet} />
            <Timeline tweets={tweets} />
        </div>
    );
}

const target = document.querySelector('#app');
ReactDOM.render(<App />, target);