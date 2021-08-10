import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";

function Map({ searchResults }) {
    const [selectedLocation, setSelectedLocation] = useState({});

    // console.log(selectedLocation);

    // Transform the search results object in the {latitute: 52.516, longitude: 15.6987} object
    const coordinates = searchResults.map((result) => ({
        longitude: result.long,
        latitude: result.lat,
    }));

    // console.table(coordinates);

    // The latitude and longitude of the center of locations coordinates
    const center = getCenter(coordinates);
    // console.log(center);

    const [viewport, setViewPort] = useState({
        width: "100%",
        height: "100%",
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11,
    });

    return (
        <ReactMapGL
            mapStyle="mapbox://styles/jitendra3018/cks0i6c0g24rl18t3tfk0melx"
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={(nextViewport) => setViewPort(nextViewport)}
        >
            {searchResults.map((result) => (
                <div key={result.long}>
                    <Marker
                        longitude={result.long}
                        latitude={result.lat}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p
                            aria-label="push-pin"
                            role="img"
                            onClick={() => setSelectedLocation(result)}
                            className="animate-bounce cursor-pointer text-2xl"
                        >
                            📌
                        </p>
                    </Marker>

                    {/* This is the popup that should show when clicked on the marker */}
                    {selectedLocation.long === result.long ? (
                        <Popup
                            closeOnClick={true}
                            onClose={() => setSelectedLocation({})}
                            latitude={result.lat}
                            longitude={result.long}
                            className="z-50"
                        >
                            {result.title}
                        </Popup>
                    ) : (
                        false
                    )}
                </div>
            ))}
        </ReactMapGL>
    );
}

export default Map;
