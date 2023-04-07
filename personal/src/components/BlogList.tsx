import BlogPost from "./BlogPost";

//TODO: Add search bar and pagination

export default function BlogList() {
    return(
        <div>
            <BlogPost 
                title="A* pathfinding algorithm"
                thumbnailUrl="https://github.com/GurkNathe/Pathfinding-Algorithms/blob/main/resources/Best-First-Search.gif?raw=true"
                summary={`Discusses the A\* pathfinding algorithm when applied to a grid-base graph.`}
                content={`The A\* algorithm implemented here was created and shown [here](https://www.youtube.com/watch?v=JtiK0DOeI4A) by Tech With Tim.`}
                tags={["Algorithms","A*","Graph Search","Pathfinding","Best-First-Search"]}
                timestamp={new Date()}
            />
        </div>
    );
}