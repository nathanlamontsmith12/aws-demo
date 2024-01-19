import React, { useState } from "react";
import { Timeline as AntTimeline, Switch, Button, Card } from "antd";
import { EventDetail } from "./EventDetail/index.jsx";

const { Item } = AntTimeline;

const EventCard = ({ onClick, title, description }) => {
    return <Card style={{ width: "260px" }}>
        <h4>{title}</h4>
        <p>{description}</p>
        <br/>
        <Button onClick={onClick}>Details</Button>
    </Card>;
};

const Timeline = ({ events }) => {
    const [mode, setMode] = useState("left");
    const [ascending, setAscending] = useState(true);
    const [selectedEventId, selectEvent] = useState("");

    const items = events.map(({ id, title, date, description }) => {
        return {
            id,
            label: date.toISOString(),
            title,
            description: description.substring(0, 85).concat("...")
        }
    });

    return <>
        <Switch onChange={(checked) => setMode(checked ? "right" : "left")} />
        <div> Date: {mode === "left" ? "Left" : "Right"} </div>
        <br />
        <Switch onChange={(checked) => setAscending(!checked)} />
        <div> {ascending ? "Old to New" : "New to Old"} </div>
        <br />
        <AntTimeline
            mode={mode}
            reverse={ascending === false}
        >
            { items.map(({ label, title, id, description }) => <Item
                key={id}
                label={label}
            >
                <EventCard onClick={() => selectEvent(id)} title={title} description={description} />
            </Item>)}
        </AntTimeline>
        <EventDetail id={selectedEventId} close={() => selectEvent("")} />
    </>;
};

export const TimelineContainer = () => {
    const now = Date.now();
    const TEST_EVENTS = [
        {
            id: "1",
            title: "Test Event 1",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse auctor cursus tortor, in pellentesque tortor feugiat sed. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
            date: new Date(now - 30000000000)
        },
        {
            id: "2",
            title: "Test Event 2",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse auctor cursus tortor, in pellentesque tortor feugiat sed. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
            date: new Date(now - 20000000000)
        },
        {
            id: "3",
            title: "Test Event 3",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse auctor cursus tortor, in pellentesque tortor feugiat sed. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
            date: new Date(now - 10000000000)
        },
        {
            id: "4",
            title: "Test Event 4",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse auctor cursus tortor, in pellentesque tortor feugiat sed. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
            date: new Date()
        }
    ];

    return <>
        <Timeline events={TEST_EVENTS} />
    </>;
};