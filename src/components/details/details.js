import React, { useState, useEffect } from 'react';
import { Grid, Segment, Image, Button, Divider, Placeholder, Rating } from 'semantic-ui-react';
import axios from 'axios';
import './details.css';

const Details = ({ id }) => {
    const [informations, setInformations] = useState([])
    const [active, setActive] = useState(false)
    const int = parseInt(informations.imdbRating)
    useEffect(() => {
        axios.get(`https://www.omdbapi.com/?apikey=71cbb5c0&i=${id}`)
            .then((res) => {
                console.log(res.data)
                setInformations(res.data)
                setActive(true)
            })
    }, [])
    return (
        <Segment>
            <Grid columns={3}>
                <Grid.Row stretched>
                    <Grid.Column width={4}>
                        {!active ? <Placeholder><Placeholder image='true'>
                        </Placeholder></Placeholder> : <div><Image src={informations.Poster} /></div>}
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Grid.Column >{!active ? <Segment textAlign='center'><Placeholder ><Placeholder.Header >
                            <Placeholder.Line />
                            <Placeholder.Line />
                        </Placeholder.Header></Placeholder></Segment> : <Divider horizontal><h1>{informations.Title}</h1></Divider>}</Grid.Column>
                        {!active ? <Placeholder>
                            <Placeholder.Paragraph>
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder.Paragraph>
                            <Placeholder.Paragraph>
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder.Paragraph>
                        </Placeholder> : <Segment> {informations.Genre !== undefined ? <div><h3>Genre:</h3><p>{informations.Genre}</p><Divider /></div> : null}
                                {informations.Released !== undefined ? <div><h3>Released:</h3><p>{informations.Released}</p><Divider /></div> : null}
                                {informations.Country !== undefined ? <div><h3>Country:</h3><p>{informations.Country}</p><Divider /></div> : null}
                                {informations.Director !== undefined ? <div><h3>Director:</h3><p>{informations.Director}</p><Divider /></div> : null}
                                {informations.Writer !== undefined ? <div><h3>Writer:</h3><p>{informations.Writer}</p><Divider /></div> : null}
                                {informations.Actors !== undefined ? <div><h3>Actors: </h3><p>{informations.Actors}</p><Divider /></div> : null}
                                {informations.BoxOffice !== undefined ? <div><h3>BoxOffice: </h3><p>{informations.BoxOffice}</p><Divider /></div> : null}
                                {informations.Production !== undefined ? <div><h3>Production: </h3><p>{informations.Production}</p></div> : null}
                            </Segment>}
                    </Grid.Column>

                </Grid.Row>
            </Grid>
            <Divider hidden />
            <h2>Rating:</h2>
            {active ?
                <Rating defaultRating={int} maxRating={10} disabled /> : null
            }
            <Segment inverted>
                <h2>About</h2>
                <p>{informations.Plot}</p>
                <Button color='red' as='a' href={`https://www.imdb.com/title/${informations.imdbID}/`} target="_blank">View</Button>
            </Segment>
        
        </Segment>
    )
}

export default Details;