export type Entity = {
    id: string;
    url: string;
    gender: {
        id: number;
        name: string;
    };
    name: string;
    type: {
        id: number;
        name: string;
    };
    participantTypes: {
        id: number;
        name: string;
    }[];
    sport: {
        id: number;
        name: string;
    };
    favouriteKey: {
        web: string | null;
        portable: string | null;
    };
    flagId: number | null;
    defaultCountry: {
        name: string;
        id: number;
        images: {
            usageId: number;
            variantTypeId: number;
            path: string;
        }[];
    };
    images: {
        path: string;
        usageId: number;
        variantTypeId: number;
    }[];
    teams: {
        id: string;
        name: string;
        kind: string;
        participantType: {
            id: number;
            name: string;
        };
    }[] | null;
    defaultTournament: {
        id: string;
        name: string;
        stageWithStatsDataIds: string[];
    } | null;
    superTemplate: {
        id: number;
        name: string;
    } | null;
}

export type EntitiesData = Entity[];
