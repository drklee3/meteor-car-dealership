import * as React from "react";

class Header extends React.Component {
    public render() {
        return (
            <section className="hero">
                <div className="hero-body">
                    <div className="container">
                    <h1 className="title is-1">
                        Meteor Car Dealership
                    </h1>
                    </div>
                </div>
            </section>
        );
    }
}

export default Header;
