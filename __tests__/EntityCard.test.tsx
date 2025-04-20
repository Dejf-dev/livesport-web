import "@testing-library/jest-dom"
import {render, screen} from "@testing-library/react"
import {EntityAllData} from "@/types/customTypes";
import {EntityCard} from "@/components/entityCard";
import React from "react";

// Mock for next/image
jest.mock("next/image", () => ({
    __esModule: true,
    // eslint-disable-next-line
    default: (props: any) =>
        React.createElement("img", {
            ...props,
            alt: props.alt || "mocked image",
        }),
}));


// Mock environment variable
process.env.NEXT_PUBLIC_IMAGE_DATA_URL = "https://example.com/";

const baseEntity: EntityAllData = {
    name: "Roger Federer",
    gender: "Men",
    sport: "Tennis",
    typeId: 3,
    countryName: "Switzerland",
    images: [],
    countryImages: [{ path: "flags/ch.png", variantTypeId: 15 }],
    participant: "Quarterfinalist",
    teams: ["Team A", "Team B"],
    superTemplateName: "Knockout Format",
};

describe("EntityCard", () => {
    it("renders main entity info", () => {
        render(<EntityCard entityInfo={baseEntity} />);
        expect(screen.getByText("Roger Federer")).toBeInTheDocument();
        expect(screen.getByText("Tennis")).toBeInTheDocument();
        expect(screen.getByText("Switzerland")).toBeInTheDocument();
    });

    it("renders country flag", () => {
        render(<EntityCard entityInfo={baseEntity} />);

        const img = screen.getByAltText("Country image")
        expect(img).toHaveAttribute("src", "https://example.com/flags/ch.png")
    });

    it("renders participant info", () => {
        render(<EntityCard entityInfo={baseEntity} />);
        expect(screen.getByText("Quarterfinalist")).toBeInTheDocument();
        expect(screen.getByText("Position")).toBeInTheDocument();
    });

    it("renders team names", () => {
        render(<EntityCard entityInfo={baseEntity} />);
        expect(screen.getByText("Team A, Team B")).toBeInTheDocument();
        expect(screen.getByText("Teams")).toBeInTheDocument();
    });

    it("renders tournament format", () => {
        render(<EntityCard entityInfo={baseEntity} />);
        expect(screen.getByText("Knockout Format")).toBeInTheDocument();
        expect(screen.getByText("Tournament format")).toBeInTheDocument();
    });

    it("renders role as Player for typeId 3", () => {
        render(<EntityCard entityInfo={baseEntity} />);
        expect(screen.getByText("Player")).toBeInTheDocument();
    });

    it("renders correct role label for typeId 1 (Tournament)", () => {
        const modEntity = { ...baseEntity, typeId: 1 };
        render(<EntityCard entityInfo={modEntity} />);
        expect(screen.getByText("Tournament")).toBeInTheDocument();
    });

    it("renders correct role label for typeId 2 (Team)", () => {
        const modEntity = { ...baseEntity, typeId: 2 };
        render(<EntityCard entityInfo={modEntity} />);
        expect(screen.getByText("Team")).toBeInTheDocument();
    });
});