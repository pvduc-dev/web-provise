# Web Provide Interview
[Graphql playground demo here!](https://web-provise-production.up.railway.app/graphql)
## Installation

```bash
$ yarn
```
## Running the app

```bash
# development
$ yarn start
```
## Test

```bash
# unit tests
$ yarn test

# unit test coverage
$ yarn test:cov
```
## Graphql query for test
```
fragment CompanyData on CompanyDto {
  id
  name
  parentId
  createdAt
  cost,
  children {
    id
    name
    createdAt
    parentId
    cost
  }
}

query Query {
  companies {
    ...CompanyData
    children {
      ...CompanyData
      children {
        ...CompanyData
        children {
          ...CompanyData
          children {
            ...CompanyData

            children {
              ...CompanyData
            }
          }
        }
      }
    }
  }
}
```
## Graphql response
```json
{
  "data": {
    "companies": [
      {
        "id": "uuid-1",
        "name": "Webprovise Corp",
        "parentId": "0",
        "createdAt": "2021-02-26T00:55:36.632Z",
        "cost": 52983,
        "children": [
          {
            "id": "uuid-2",
            "name": "Stamm LLC",
            "createdAt": "2021-02-25T10:35:32.978Z",
            "parentId": "uuid-1",
            "cost": 5199,
            "children": [
              {
                "id": "uuid-4",
                "name": "Price and Sons",
                "createdAt": "2021-02-25T06:11:47.519Z",
                "parentId": "uuid-2",
                "cost": 1340,
                "children": []
              },
              {
                "id": "uuid-7",
                "name": "Zieme - Mills",
                "createdAt": "2021-02-25T07:56:32.335Z",
                "parentId": "uuid-2",
                "cost": 1636,
                "children": []
              },
              {
                "id": "uuid-19",
                "name": "Schneider - Adams",
                "createdAt": "2021-02-25T21:06:18.777Z",
                "parentId": "uuid-2",
                "cost": 794,
                "children": []
              }
            ]
          },
          {
            "id": "uuid-3",
            "name": "Blanda, Langosh and Barton",
            "createdAt": "2021-02-25T15:16:30.887Z",
            "parentId": "uuid-1",
            "cost": 15713,
            "children": [
              {
                "id": "uuid-5",
                "name": "Hane - Windler",
                "createdAt": "2021-02-25T13:35:57.923Z",
                "parentId": "uuid-3",
                "cost": 1288,
                "children": []
              },
              {
                "id": "uuid-6",
                "name": "Vandervort - Bechtelar",
                "createdAt": "2021-02-26T01:41:06.479Z",
                "parentId": "uuid-3",
                "cost": 2512,
                "children": []
              },
              {
                "id": "uuid-9",
                "name": "Kuhic - Swift",
                "createdAt": "2021-02-25T16:02:49.099Z",
                "parentId": "uuid-3",
                "cost": 3086,
                "children": []
              },
              {
                "id": "uuid-17",
                "name": "Rohan, Mayer and Haley",
                "createdAt": "2021-02-25T11:17:52.132Z",
                "parentId": "uuid-3",
                "cost": 4072,
                "children": []
              },
              {
                "id": "uuid-20",
                "name": "Kunde, Armstrong and Hermann",
                "createdAt": "2021-02-26T01:51:25.421Z",
                "parentId": "uuid-3",
                "cost": 908,
                "children": []
              }
            ]
          },
          {
            "id": "uuid-8",
            "name": "Bartell - Mosciski",
            "createdAt": "2021-02-25T23:47:57.596Z",
            "parentId": "uuid-1",
            "cost": 28817,
            "children": [
              {
                "id": "uuid-10",
                "name": "Lockman Inc",
                "createdAt": "2021-02-26T01:39:33.438Z",
                "parentId": "uuid-8",
                "cost": 4288,
                "children": []
              },
              {
                "id": "uuid-11",
                "name": "Parker - Shanahan",
                "createdAt": "2021-02-26T00:32:01.307Z",
                "parentId": "uuid-8",
                "cost": 12236,
                "children": [
                  {
                    "id": "uuid-12",
                    "name": "Swaniawski Inc",
                    "createdAt": "2021-02-25T06:44:56.245Z",
                    "parentId": "uuid-11",
                    "cost": 2110,
                    "children": []
                  },
                  {
                    "id": "uuid-14",
                    "name": "Weimann, Runolfsson and Hand",
                    "createdAt": "2021-02-25T15:22:08.098Z",
                    "parentId": "uuid-11",
                    "cost": 7254,
                    "children": []
                  }
                ]
              },
              {
                "id": "uuid-13",
                "name": "Balistreri - Bruen",
                "createdAt": "2021-02-25T20:45:53.518Z",
                "parentId": "uuid-8",
                "cost": 1686,
                "children": []
              },
              {
                "id": "uuid-15",
                "name": "Predovic and Sons",
                "createdAt": "2021-02-25T18:00:26.864Z",
                "parentId": "uuid-8",
                "cost": 4725,
                "children": []
              },
              {
                "id": "uuid-16",
                "name": "Weissnat - Murazik",
                "createdAt": "2021-02-26T01:50:50.354Z",
                "parentId": "uuid-8",
                "cost": 3277,
                "children": []
              }
            ]
          },
          {
            "id": "uuid-18",
            "name": "Walter, Schmidt and Osinski",
            "createdAt": "2021-02-26T02:31:22.154Z",
            "parentId": "uuid-1",
            "cost": 2033,
            "children": []
          }
        ]
      }
    ]
  }
}
```
