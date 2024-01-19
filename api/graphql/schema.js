export const typeDefs = `#graphql

    scalar Date
    scalar Upload
    scalar EventDataJSON

    union Node =
        Case |
        CaseCategory |
        Document |
        DocumentCategory |
        DocumentSubjectOption |
        Event |
        EventCategory |
        EventData |
        EventDataCategory |
        Permission |
        Role |
        User

    union DocumentSubject =
        Case |
        Event |
        User

    type Case {
        id: ID
        client: User
        category: CaseCategory
        documents: [Document]
        events: [Event]
        createdAt: Date
        updatedAt: Date
    }

    type CaseCategory {
        id: ID
        name: String
        cases: [Case]
        description: String
        createdAt: Date
        updatedAt: Date
    }

    type DocumentCategory {
        id: ID
        name: String
        documents: [Document]
        description: String
        createdAt: Date
        updatedAt: Date
    }

    type EventCategory {
        id: ID
        name: String
        events: [Event]
        description: String
        createdAt: Date
        updatedAt: Date
    }

    type EventDataCategory {
        id: ID
        name: String
        eventData: [EventData]
        description: String
        createdAt: Date
        updatedAt: Date
    }

    type Document {
        id: ID
        author: User
        subject: DocumentSubject
        category: DocumentCategory
        name: String
        size: Int
        uploadStatus: String
        createdAt: Date
        updatedAt: Date
    }

    type DocumentSubjectOption {
        id: ID
        name: String
        typename: String
        tablename: String
        description: String
        createdAt: Date
        updatedAt: Date
    }

    type Event {
        id: ID
        startDate: Date
        endDate: Date
        description: String
        case: Case
        documents: [Document]
        category: EventCategory
        eventData: [EventData]
        createdAt: Date
        updatedAt: Date
    }

    type EventData {
        id: ID
        event: Event
        category: EventDataCategory
        data: EventDataJSON
        createdAt: Date
        updatedAt: Date
    }

    type Permission {
        id: ID
        name: String
        users: [User]
        roles: [Role]
        description: String
        createdAt: Date
        updatedAt: Date
    }

    type Role {
        id: ID
        name: String
        description: String
        permissions: [Permission]
        createdAt: Date
        updatedAt: Date
    }

    type User {
        id: ID
        firstName: String
        lastName: String
        email: String
        phone: String
        roles: [Role]
        cases: [Case]
        permissions: [Permission]
        documents: [Document]
        uploads: [Document]
        createdAt: Date
        updatedAt: Date
    }

    type MutationResponse {
        success: Boolean
        message: String
        data: Node
    }

    type Query {
        case(id: ID): Case
        cases: [Case]
        caseCategory(id: ID): CaseCategory
        caseCategories: [CaseCategory]
        document(id: ID): Document
        documents: [Document]
        documentCategory(id: ID): DocumentCategory
        documentCategories: [DocumentCategory]
        documentSubjectOption(id: ID): DocumentSubjectOption
        documentSubjectOptions: [DocumentSubjectOption]
        event(id: ID): Event
        events: [Event]
        eventCategory(id: ID): EventCategory
        eventCategories: [EventCategory]
        eventDatum(id: ID): EventData
        eventData: [EventData]
        eventDataCategory(id: ID): EventDataCategory
        eventDataCategories: [EventDataCategory]
        permission(id: ID): Permission
        permissions: [Permission]
        role(id: ID): Role
        roles: [Role]
        user(id: ID): User
        users: [User]
    }

    type Mutation {
        createUser(
            firstName: String
            lastName: String
            phone: String
            email: String
        ): MutationResponse
    }
`;