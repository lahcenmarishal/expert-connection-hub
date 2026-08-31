// Villes du Maroc — catalogue statique (frontend). Aucun appel base de données.
import type { Database } from "@/integrations/supabase/types";

export type CityRow = Database["public"]["Tables"]["cities"]["Row"];

export const CITIES: CityRow[] = [
  {
    "id": "0da0d194-43ab-5b0d-8fc8-1b20007ecd7d",
    "name": "Agadir",
    "lat": 30.4278,
    "lng": -9.5981,
    "is_active": true
  },
  {
    "id": "386dcb86-8ee0-5108-84a7-b6e9c1e9337e",
    "name": "Agdz",
    "lat": 30.7,
    "lng": -6.45,
    "is_active": true
  },
  {
    "id": "36e6b635-23ef-5e10-82a5-e9f152cc9926",
    "name": "Ahfir",
    "lat": 34.95,
    "lng": -2.1,
    "is_active": true
  },
  {
    "id": "6e0c50dd-125b-571d-8e5d-f57d555284b3",
    "name": "Ain Aouda",
    "lat": 33.8028,
    "lng": -6.7906,
    "is_active": true
  },
  {
    "id": "c44ad21d-1ae0-53e3-8c29-0f4895bedaaf",
    "name": "Ain Bni Mathar",
    "lat": 34.0833,
    "lng": -2.0333,
    "is_active": true
  },
  {
    "id": "a00cd955-38e9-5038-864e-6d8815e291f3",
    "name": "Ain Dorij",
    "lat": 34.55,
    "lng": -5.4667,
    "is_active": true
  },
  {
    "id": "8748ac75-6222-53c1-857b-183381ea82ee",
    "name": "Ain Harrouda",
    "lat": 33.6383,
    "lng": -7.4467,
    "is_active": true
  },
  {
    "id": "97acdf77-94bb-54f0-8236-ece1c37ac82d",
    "name": "Ain Taoujdate",
    "lat": 33.9333,
    "lng": -5.2167,
    "is_active": true
  },
  {
    "id": "380a29d9-3a58-5320-8dde-2366e1b59647",
    "name": "Ait Baha",
    "lat": 30.0667,
    "lng": -9.15,
    "is_active": true
  },
  {
    "id": "693d1026-52ae-57de-8df6-b4b0b3f31072",
    "name": "Ait Melloul",
    "lat": 30.3342,
    "lng": -9.4967,
    "is_active": true
  },
  {
    "id": "9e985c1f-ab9f-5252-82b9-de498b347b4b",
    "name": "Ait Ourir",
    "lat": 31.5628,
    "lng": -7.6644,
    "is_active": true
  },
  {
    "id": "ecfa278b-f4cf-5c96-8d2e-4a490c0d93e0",
    "name": "Akka",
    "lat": 29.4,
    "lng": -8.25,
    "is_active": true
  },
  {
    "id": "47fe1f01-578c-5542-844b-57f08fe6eed4",
    "name": "Aknoul",
    "lat": 34.65,
    "lng": -3.8667,
    "is_active": true
  },
  {
    "id": "eed14bee-e1fb-53e0-84a8-9e6648b342dd",
    "name": "Al Hoceima",
    "lat": 35.2517,
    "lng": -3.9372,
    "is_active": true
  },
  {
    "id": "7f1aeaa5-cef7-572e-8ba4-52984a26840f",
    "name": "Amizmiz",
    "lat": 31.2167,
    "lng": -8.2333,
    "is_active": true
  },
  {
    "id": "c9db9740-51a3-57b5-8af3-e5fa27b59faf",
    "name": "Aourir",
    "lat": 30.5333,
    "lng": -9.6333,
    "is_active": true
  },
  {
    "id": "8f01fa0d-55c7-5f1d-8076-e8f1747d37d2",
    "name": "Arbaoua",
    "lat": 34.9042,
    "lng": -6.0181,
    "is_active": true
  },
  {
    "id": "6abb041a-bc12-5de9-8a12-04875729ac22",
    "name": "Assa",
    "lat": 28.6103,
    "lng": -9.4269,
    "is_active": true
  },
  {
    "id": "26dddf10-51ec-57ba-8106-a214f54ef07e",
    "name": "Assilah",
    "lat": 35.4653,
    "lng": -6.0349,
    "is_active": true
  },
  {
    "id": "055de944-cecf-5938-8a64-f53cecdb914f",
    "name": "Azemmour",
    "lat": 33.2866,
    "lng": -8.3422,
    "is_active": true
  },
  {
    "id": "1e47b033-7139-5b7a-85a5-12ff42c2103f",
    "name": "Azilal",
    "lat": 31.9614,
    "lng": -6.5731,
    "is_active": true
  },
  {
    "id": "2393b8aa-992f-5182-86de-d4b2041a286e",
    "name": "Azrou",
    "lat": 33.4342,
    "lng": -5.2214,
    "is_active": true
  },
  {
    "id": "94510a90-f03f-52e7-833a-7a043aa37fec",
    "name": "Ben Ahmed",
    "lat": 33.0653,
    "lng": -7.2481,
    "is_active": true
  },
  {
    "id": "99bc3df8-089c-535f-8f27-4eaf148303a2",
    "name": "Ben Guerir",
    "lat": 32.236,
    "lng": -7.954,
    "is_active": true
  },
  {
    "id": "516217c0-c8ab-5733-828f-a009e4fd51f8",
    "name": "Beni Mellal",
    "lat": 32.3373,
    "lng": -6.3498,
    "is_active": true
  },
  {
    "id": "41449378-93cc-5a38-873e-08ddce389ef7",
    "name": "Berkane",
    "lat": 34.92,
    "lng": -2.32,
    "is_active": true
  },
  {
    "id": "fa823831-64bc-57e7-8093-319362e4a23c",
    "name": "Berrechid",
    "lat": 33.2655,
    "lng": -7.5877,
    "is_active": true
  },
  {
    "id": "05b9698b-7fe2-5e70-81ac-b433be9e11bb",
    "name": "Biougra",
    "lat": 30.2136,
    "lng": -9.3697,
    "is_active": true
  },
  {
    "id": "8b2d09c8-a17c-5ac4-8256-bc12b067378c",
    "name": "Bir Jdid",
    "lat": 33.35,
    "lng": -8.05,
    "is_active": true
  },
  {
    "id": "52becb1d-f813-5cd3-836b-1a1211361a31",
    "name": "Bni Bouayach",
    "lat": 35.1,
    "lng": -3.85,
    "is_active": true
  },
  {
    "id": "4437aa17-5774-516d-8be4-e9a214264eda",
    "name": "Bouarfa",
    "lat": 32.5311,
    "lng": -1.965,
    "is_active": true
  },
  {
    "id": "14eb661d-2298-55bb-8cd8-98dc0d197627",
    "name": "Bouizakarne",
    "lat": 29.1728,
    "lng": -9.7278,
    "is_active": true
  },
  {
    "id": "cc9ef23b-046b-5b67-8bd5-0e5f63e9a8d3",
    "name": "Boujdour",
    "lat": 26.1265,
    "lng": -14.4842,
    "is_active": true
  },
  {
    "id": "3c23fc41-cd61-582f-86a6-47619e2f57b1",
    "name": "Bouknadel",
    "lat": 34.05,
    "lng": -6.7333,
    "is_active": true
  },
  {
    "id": "fcaa3c2f-5db0-5e02-8366-ea7ae8080aad",
    "name": "Boulemane",
    "lat": 33.3625,
    "lng": -4.73,
    "is_active": true
  },
  {
    "id": "1555b392-19c2-535e-847f-1e9f804d4db5",
    "name": "Boumalne Dades",
    "lat": 31.3667,
    "lng": -5.9833,
    "is_active": true
  },
  {
    "id": "0aaa459b-353f-504a-8829-80a5cfff60a3",
    "name": "Boumia",
    "lat": 32.7239,
    "lng": -5.1017,
    "is_active": true
  },
  {
    "id": "1f78a0cf-8359-5324-8363-1ec1ca950b28",
    "name": "Bouskoura",
    "lat": 33.4494,
    "lng": -7.6489,
    "is_active": true
  },
  {
    "id": "92c1a2ea-5e34-531c-8b82-5502d47645e4",
    "name": "Bouznika",
    "lat": 33.7894,
    "lng": -7.1594,
    "is_active": true
  },
  {
    "id": "0b96d711-2008-56ce-8ea1-e6eb483a83e8",
    "name": "Casablanca",
    "lat": 33.5731,
    "lng": -7.5898,
    "is_active": true
  },
  {
    "id": "988de3df-ef81-56fe-871d-73929bc4a9a5",
    "name": "Chefchaouen",
    "lat": 35.1688,
    "lng": -5.2636,
    "is_active": true
  },
  {
    "id": "71f25fcb-339c-5c95-85b5-66cdfadeccd8",
    "name": "Chichaoua",
    "lat": 31.545,
    "lng": -8.7622,
    "is_active": true
  },
  {
    "id": "1971b6eb-33ad-566f-8f41-1aa2ae199ea7",
    "name": "Chtouka",
    "lat": 33.0333,
    "lng": -8.4167,
    "is_active": true
  },
  {
    "id": "08641527-67e0-5508-8ee4-69534b86e948",
    "name": "Dakhla",
    "lat": 23.6848,
    "lng": -15.9579,
    "is_active": true
  },
  {
    "id": "0a69f653-9f92-5bb6-851b-2546c04f0f7a",
    "name": "Dar Bouazza",
    "lat": 33.5231,
    "lng": -7.7936,
    "is_active": true
  },
  {
    "id": "ad7db803-4cf1-5c8e-8ede-cf6624bb50d0",
    "name": "Demnate",
    "lat": 31.7333,
    "lng": -7.0333,
    "is_active": true
  },
  {
    "id": "f200abbb-7414-511a-82f6-dfd10a17b001",
    "name": "Deroua",
    "lat": 33.3486,
    "lng": -7.6289,
    "is_active": true
  },
  {
    "id": "8e0db949-ac1d-582d-8492-11bd42c21f9d",
    "name": "Driouch",
    "lat": 34.9789,
    "lng": -3.3897,
    "is_active": true
  },
  {
    "id": "c0a05b84-30e0-526e-883c-755594db99cc",
    "name": "El Borouj",
    "lat": 32.4972,
    "lng": -7.1889,
    "is_active": true
  },
  {
    "id": "9b207862-b9d6-5911-87ea-d0bae02a25b0",
    "name": "El Hajeb",
    "lat": 33.6875,
    "lng": -5.3706,
    "is_active": true
  },
  {
    "id": "a271c790-5a7d-5b56-8643-bfc37b626fac",
    "name": "El Jadida",
    "lat": 33.2316,
    "lng": -8.5007,
    "is_active": true
  },
  {
    "id": "201204c9-8460-5240-8d71-26c89915a188",
    "name": "El Kelaa des Sraghna",
    "lat": 32.05,
    "lng": -7.4083,
    "is_active": true
  },
  {
    "id": "fc11730d-39c5-566e-89c3-9b5a68a9fc7e",
    "name": "Erfoud",
    "lat": 31.4333,
    "lng": -4.2333,
    "is_active": true
  },
  {
    "id": "83303041-5a1d-58bc-8a7e-85b09db30781",
    "name": "Errachidia",
    "lat": 31.9314,
    "lng": -4.4245,
    "is_active": true
  },
  {
    "id": "8c0a4a8b-d4ed-5e03-8d5a-6add87789228",
    "name": "Es-Semara",
    "lat": 26.7418,
    "lng": -11.6748,
    "is_active": true
  },
  {
    "id": "c03517fb-9665-5cc8-8e16-cb5893e8807e",
    "name": "Essaouira",
    "lat": 31.5085,
    "lng": -9.7595,
    "is_active": true
  },
  {
    "id": "1b629a26-4eab-5457-8621-8e4019646e5c",
    "name": "Fam El Hisn",
    "lat": 29.05,
    "lng": -8.8833,
    "is_active": true
  },
  {
    "id": "69b2cbe3-7390-5508-82aa-94a2f7608d5e",
    "name": "Figuig",
    "lat": 32.1092,
    "lng": -1.2286,
    "is_active": true
  },
  {
    "id": "25d9f424-d65c-54a1-8b0b-3ae0f9a77daf",
    "name": "Fnideq",
    "lat": 35.8489,
    "lng": -5.3556,
    "is_active": true
  },
  {
    "id": "ba89a9aa-5e58-51bd-8614-2f8096d10b00",
    "name": "Foum Zguid",
    "lat": 30.0833,
    "lng": -6.8667,
    "is_active": true
  },
  {
    "id": "8e602244-0c8f-5757-81d4-0ab2af665317",
    "name": "Fquih Ben Salah",
    "lat": 32.5,
    "lng": -6.6833,
    "is_active": true
  },
  {
    "id": "ec9deda2-116c-524e-8ed0-d9174fd9828a",
    "name": "Fès",
    "lat": 34.0331,
    "lng": -5.0003,
    "is_active": true
  },
  {
    "id": "da13ae71-4ffa-5267-8da5-8f64c4cd1dff",
    "name": "Goulmima",
    "lat": 31.6944,
    "lng": -4.9556,
    "is_active": true
  },
  {
    "id": "d5d8b157-35cd-5018-8800-24543be904f0",
    "name": "Guelmim",
    "lat": 28.987,
    "lng": -10.0574,
    "is_active": true
  },
  {
    "id": "b902db2f-ce41-5328-86ff-bc9b674ebf6a",
    "name": "Guercif",
    "lat": 34.2258,
    "lng": -3.3542,
    "is_active": true
  },
  {
    "id": "d6b93298-74ee-536f-8144-db1c43ce54c2",
    "name": "Had Soualem",
    "lat": 33.4275,
    "lng": -7.8531,
    "is_active": true
  },
  {
    "id": "53bacb3e-2697-589c-877f-31e8fe2db0e2",
    "name": "Ifrane",
    "lat": 33.5228,
    "lng": -5.1106,
    "is_active": true
  },
  {
    "id": "9268b77f-ff88-565b-8db9-f61c86c4f848",
    "name": "Imilchil",
    "lat": 32.1667,
    "lng": -5.6333,
    "is_active": true
  },
  {
    "id": "10b0aeb4-b69d-5d38-80f4-b50a5857ef7a",
    "name": "Imzouren",
    "lat": 35.1447,
    "lng": -3.8514,
    "is_active": true
  },
  {
    "id": "1ac08d58-2ad9-579a-8f20-072396140588",
    "name": "Inezgane",
    "lat": 30.355,
    "lng": -9.54,
    "is_active": true
  },
  {
    "id": "07a67b6b-96b7-5dfc-8d81-a542d262bfe2",
    "name": "Issaguen",
    "lat": 34.85,
    "lng": -4.6,
    "is_active": true
  },
  {
    "id": "604b821d-7521-570a-855b-eb16921e2b5d",
    "name": "Jebha",
    "lat": 35.2167,
    "lng": -4.6667,
    "is_active": true
  },
  {
    "id": "cb9fd93c-70a7-54d2-8ef1-2c2714b41bb9",
    "name": "Jerada",
    "lat": 34.3111,
    "lng": -2.1667,
    "is_active": true
  },
  {
    "id": "5b2bc445-0f90-57cb-85a6-31436c08515d",
    "name": "Kalaat MGouna",
    "lat": 31.2411,
    "lng": -5.9997,
    "is_active": true
  },
  {
    "id": "9b3e86b5-ed0f-5088-83bd-455378d2f6ff",
    "name": "Karia Ba Mohamed",
    "lat": 34.4167,
    "lng": -5.2,
    "is_active": true
  },
  {
    "id": "c5386bc0-ebd1-59c1-8ea2-be6bf7db2a7a",
    "name": "Kasba Tadla",
    "lat": 32.5967,
    "lng": -6.2664,
    "is_active": true
  },
  {
    "id": "18ba8b75-35fc-5f33-8be0-d562209a11c2",
    "name": "Kenitra",
    "lat": 34.261,
    "lng": -6.5802,
    "is_active": true
  },
  {
    "id": "866e1fc7-9563-58b2-84df-0da02cec0739",
    "name": "Ketama",
    "lat": 34.8833,
    "lng": -4.5833,
    "is_active": true
  },
  {
    "id": "4ec90360-03e6-56a8-8614-9c09ea73ea59",
    "name": "Khemisset",
    "lat": 33.8242,
    "lng": -6.0658,
    "is_active": true
  },
  {
    "id": "1d6cc11c-5bf0-5510-8145-23dd02f2d479",
    "name": "Khenifra",
    "lat": 32.9394,
    "lng": -5.6681,
    "is_active": true
  },
  {
    "id": "fe6819b6-2068-544c-8d70-719b54532b4f",
    "name": "Khouribga",
    "lat": 32.8811,
    "lng": -6.9063,
    "is_active": true
  },
  {
    "id": "bb83c374-2960-5eb2-8091-bc297a50cdb6",
    "name": "Ksar El Kébir",
    "lat": 35.0011,
    "lng": -5.9006,
    "is_active": true
  },
  {
    "id": "973b9ee6-06ae-5a23-871d-be1692c085c3",
    "name": "Laayoune",
    "lat": 27.1253,
    "lng": -13.1625,
    "is_active": true
  },
  {
    "id": "cb336d68-03af-5d10-8528-9af9cb863a03",
    "name": "Larache",
    "lat": 35.1932,
    "lng": -6.1557,
    "is_active": true
  },
  {
    "id": "b635f439-4263-5640-88ca-6637237473a6",
    "name": "Marrakech",
    "lat": 31.6295,
    "lng": -7.9811,
    "is_active": true
  },
  {
    "id": "8569e34c-122c-586d-8ae6-9642ce3172ef",
    "name": "Martil",
    "lat": 35.6167,
    "lng": -5.275,
    "is_active": true
  },
  {
    "id": "53d87a78-b011-5b17-8421-90949eb4b715",
    "name": "Mdiq",
    "lat": 35.6853,
    "lng": -5.3247,
    "is_active": true
  },
  {
    "id": "477651c8-a75f-5af5-82f5-22a21ae5031c",
    "name": "Mechra Bel Ksiri",
    "lat": 34.5667,
    "lng": -5.9667,
    "is_active": true
  },
  {
    "id": "fe2538e7-2994-58b4-87e6-a61373957e16",
    "name": "Meknès",
    "lat": 33.8935,
    "lng": -5.5473,
    "is_active": true
  },
  {
    "id": "60264559-fd98-5141-8102-322d5821ea01",
    "name": "Midar",
    "lat": 34.9333,
    "lng": -3.5333,
    "is_active": true
  },
  {
    "id": "c822783e-d5e1-5ea8-81cc-0dab6215c941",
    "name": "Midelt",
    "lat": 32.6852,
    "lng": -4.735,
    "is_active": true
  },
  {
    "id": "6cbd4418-fc5a-5725-8162-72c277064c06",
    "name": "Mirleft",
    "lat": 29.5833,
    "lng": -10.0333,
    "is_active": true
  },
  {
    "id": "eb6fd277-2300-54c5-8474-aa13c41ecb86",
    "name": "Missour",
    "lat": 33.0472,
    "lng": -3.9889,
    "is_active": true
  },
  {
    "id": "b6d199aa-40d1-506f-8f14-7eeb212b3de4",
    "name": "Mohammedia",
    "lat": 33.6861,
    "lng": -7.3828,
    "is_active": true
  },
  {
    "id": "bfbe8a19-d2b9-5324-8de9-f99e5fae5775",
    "name": "Moulay Bousselham",
    "lat": 34.8783,
    "lng": -6.2933,
    "is_active": true
  },
  {
    "id": "0b6da8a2-5ff8-5447-869e-dbf519f85db8",
    "name": "Moulay Idriss Zerhoun",
    "lat": 34.0547,
    "lng": -5.5253,
    "is_active": true
  },
  {
    "id": "39f5ddd0-3c47-5f3d-89b9-aa7f1fff08d2",
    "name": "Médiouna",
    "lat": 33.4514,
    "lng": -7.5119,
    "is_active": true
  },
  {
    "id": "8c194594-20a4-5bb4-822c-f3d0e5f8ff48",
    "name": "Nador",
    "lat": 35.174,
    "lng": -2.9287,
    "is_active": true
  },
  {
    "id": "ce1eb0aa-c85e-5640-82ed-79da0b3a1750",
    "name": "Nouaceur",
    "lat": 33.3689,
    "lng": -7.5822,
    "is_active": true
  },
  {
    "id": "8471b034-3720-5635-8157-9f92cdb3a63f",
    "name": "Oualidia",
    "lat": 32.7333,
    "lng": -9.0333,
    "is_active": true
  },
  {
    "id": "d71c7865-0abc-5cce-886a-acd93a66410a",
    "name": "Ouarzazate",
    "lat": 30.9189,
    "lng": -6.8934,
    "is_active": true
  },
  {
    "id": "b146f960-9785-50e3-8fef-298c44466cf3",
    "name": "Ouazzane",
    "lat": 34.7963,
    "lng": -5.585,
    "is_active": true
  },
  {
    "id": "31871bad-ccd1-5d3e-8c2c-1872e1ec3e78",
    "name": "Oued Laou",
    "lat": 35.4333,
    "lng": -5.0833,
    "is_active": true
  },
  {
    "id": "e01e06b8-cb14-57b6-857b-55ec869ce201",
    "name": "Oued Zem",
    "lat": 32.8628,
    "lng": -6.5731,
    "is_active": true
  },
  {
    "id": "3c960b1d-d536-53be-8a6b-30696d3ee156",
    "name": "Oujda",
    "lat": 34.6814,
    "lng": -1.9086,
    "is_active": true
  },
  {
    "id": "f95cdfdc-595c-5c7f-8d74-d0590271975c",
    "name": "Oulad Berhil",
    "lat": 30.6339,
    "lng": -8.4772,
    "is_active": true
  },
  {
    "id": "2bc40a34-23dc-50bb-8972-dc07dafbf85c",
    "name": "Ouled Abbou",
    "lat": 33.1667,
    "lng": -7.7833,
    "is_active": true
  },
  {
    "id": "de4afee6-d557-50ae-83f2-021b6c885fd8",
    "name": "Ouled Teima",
    "lat": 30.3922,
    "lng": -9.21,
    "is_active": true
  },
  {
    "id": "945cbb9f-adba-513c-87c3-b1686a663ee6",
    "name": "Oulmès",
    "lat": 33.43,
    "lng": -6.0,
    "is_active": true
  },
  {
    "id": "e810ce5d-64d4-54fe-8b10-0a4e41a47d9b",
    "name": "Outat El Haj",
    "lat": 33.3411,
    "lng": -3.6969,
    "is_active": true
  },
  {
    "id": "221a8cad-b71b-5cb9-81b6-72625a915648",
    "name": "Rabat",
    "lat": 34.0209,
    "lng": -6.8416,
    "is_active": true
  },
  {
    "id": "da89de6c-cd6b-5982-826d-e8214a3dcc64",
    "name": "Ras El Ma",
    "lat": 35.1333,
    "lng": -2.4333,
    "is_active": true
  },
  {
    "id": "8c77fb64-f8e0-5c17-8076-e89f4b412f18",
    "name": "Rissani",
    "lat": 31.28,
    "lng": -4.26,
    "is_active": true
  },
  {
    "id": "d58fffb6-2675-5528-8bff-2a7adae30223",
    "name": "Rommani",
    "lat": 33.5322,
    "lng": -6.6083,
    "is_active": true
  },
  {
    "id": "efb8a50a-a31c-5135-8641-983ae3d4da8d",
    "name": "Safi",
    "lat": 32.2994,
    "lng": -9.2372,
    "is_active": true
  },
  {
    "id": "8c889dd5-31da-5f70-877a-8ab54457a68e",
    "name": "Salé",
    "lat": 34.0531,
    "lng": -6.7985,
    "is_active": true
  },
  {
    "id": "bd14ea15-2271-5b33-8448-b03c6bb86745",
    "name": "Saïdia",
    "lat": 35.0925,
    "lng": -2.2314,
    "is_active": true
  },
  {
    "id": "233b80eb-4bed-54ee-86b6-6faa0d108160",
    "name": "Sefrou",
    "lat": 33.83,
    "lng": -4.83,
    "is_active": true
  },
  {
    "id": "fadd6c72-93ee-5247-88bd-99ab736a6765",
    "name": "Selouane",
    "lat": 35.0667,
    "lng": -2.95,
    "is_active": true
  },
  {
    "id": "1930ddaf-4043-54ec-854a-3c89457d5e66",
    "name": "Settat",
    "lat": 33.0011,
    "lng": -7.6166,
    "is_active": true
  },
  {
    "id": "9ee6d4a8-203f-516e-8446-1da5cced2c3a",
    "name": "Sidi Allal El Bahraoui",
    "lat": 33.9006,
    "lng": -6.6297,
    "is_active": true
  },
  {
    "id": "fd6e51b3-66a1-5083-823f-6477cf2c9645",
    "name": "Sidi Bennour",
    "lat": 32.6522,
    "lng": -8.4283,
    "is_active": true
  },
  {
    "id": "8c195819-e750-5a2b-8a88-97dd36303537",
    "name": "Sidi Ifni",
    "lat": 29.3797,
    "lng": -10.1728,
    "is_active": true
  },
  {
    "id": "cf769480-b648-5d22-895c-4fa1b8f3399c",
    "name": "Sidi Kacem",
    "lat": 34.2261,
    "lng": -5.7075,
    "is_active": true
  },
  {
    "id": "42a92735-498c-5ffc-87bd-2378f957424c",
    "name": "Sidi Moussa",
    "lat": 32.8333,
    "lng": -8.7833,
    "is_active": true
  },
  {
    "id": "ea169f3e-c5a8-5dea-886e-b1a195b18733",
    "name": "Sidi Rahal",
    "lat": 33.4864,
    "lng": -7.2317,
    "is_active": true
  },
  {
    "id": "c7247c26-64d3-5d48-836e-96afb565b09f",
    "name": "Sidi Slimane",
    "lat": 34.265,
    "lng": -5.9269,
    "is_active": true
  },
  {
    "id": "2819c431-c220-5752-8b76-cc2c1fa1b4d4",
    "name": "Sidi Smail",
    "lat": 32.8167,
    "lng": -8.45,
    "is_active": true
  },
  {
    "id": "786167f6-a9da-58f1-8562-e1d6aaf1e69d",
    "name": "Sidi Yahya El Gharb",
    "lat": 34.3053,
    "lng": -6.3053,
    "is_active": true
  },
  {
    "id": "d837bd36-b216-5ea9-8990-7cda1510c3b0",
    "name": "Skhirate",
    "lat": 33.85,
    "lng": -7.0333,
    "is_active": true
  },
  {
    "id": "6a4d1b55-ae7d-5e07-8b66-9e3ff10905ac",
    "name": "Skoura",
    "lat": 31.1167,
    "lng": -6.55,
    "is_active": true
  },
  {
    "id": "143eb8f2-7cb0-5c1f-80cb-7a464b5de7f6",
    "name": "Souk Sebt Ould Nemma",
    "lat": 32.3167,
    "lng": -6.7,
    "is_active": true
  },
  {
    "id": "fe21d52d-fc3a-5774-8cc3-ad76ed6828ed",
    "name": "Tafraout",
    "lat": 29.7208,
    "lng": -8.9756,
    "is_active": true
  },
  {
    "id": "8fa87981-3ea0-55a2-898e-7043d3283516",
    "name": "Tahannaout",
    "lat": 31.3583,
    "lng": -7.95,
    "is_active": true
  },
  {
    "id": "3646bf4a-32a1-5462-8cf8-bfc35f84731b",
    "name": "Tahla",
    "lat": 34.05,
    "lng": -4.4333,
    "is_active": true
  },
  {
    "id": "6d24c0bb-eb87-5811-890b-46f5a7413f1c",
    "name": "Tamesna",
    "lat": 33.8306,
    "lng": -6.92,
    "is_active": true
  },
  {
    "id": "86f4c0d3-58ad-5bf7-8ed2-c9c6b6f0c6f1",
    "name": "Tan-Tan",
    "lat": 28.4378,
    "lng": -11.1031,
    "is_active": true
  },
  {
    "id": "efd4ab00-5e57-51f9-81e6-9a60179d91ed",
    "name": "Tanger",
    "lat": 35.7595,
    "lng": -5.834,
    "is_active": true
  },
  {
    "id": "18c91195-823e-50b3-80b4-072b26b38003",
    "name": "Taounate",
    "lat": 34.5364,
    "lng": -4.6403,
    "is_active": true
  },
  {
    "id": "fde15095-7fa1-5528-80bb-7a6e6ab1a706",
    "name": "Taourirt",
    "lat": 34.4069,
    "lng": -2.8975,
    "is_active": true
  },
  {
    "id": "93a2feac-cf6d-59f6-8935-79bcc4f47d80",
    "name": "Tarfaya",
    "lat": 27.9383,
    "lng": -12.9292,
    "is_active": true
  },
  {
    "id": "8e535226-839d-5050-8f18-3ab0a38e0ec9",
    "name": "Targuist",
    "lat": 34.9422,
    "lng": -4.3153,
    "is_active": true
  },
  {
    "id": "0bfc9c0f-cbd9-5446-8865-480e602ab29c",
    "name": "Tarhjijt",
    "lat": 29.0667,
    "lng": -9.4667,
    "is_active": true
  },
  {
    "id": "f5e60562-b185-5b08-8e5a-96376ec0c9d5",
    "name": "Taroudant",
    "lat": 30.4703,
    "lng": -8.877,
    "is_active": true
  },
  {
    "id": "b265d75d-1d73-5cbc-8494-b139acecced6",
    "name": "Tata",
    "lat": 29.75,
    "lng": -7.9722,
    "is_active": true
  },
  {
    "id": "9dcfaeb3-00d5-530a-8cef-f05932674641",
    "name": "Taza",
    "lat": 34.21,
    "lng": -4.01,
    "is_active": true
  },
  {
    "id": "9cbbbb3b-f4a2-5133-882f-099972c43c46",
    "name": "Tendrara",
    "lat": 33.05,
    "lng": -2.0,
    "is_active": true
  },
  {
    "id": "36fd5d50-19a2-592e-841e-b821bb73af0c",
    "name": "Tiflet",
    "lat": 33.8944,
    "lng": -6.3061,
    "is_active": true
  },
  {
    "id": "a8ff170a-9430-55f6-87ae-7a6328b7328d",
    "name": "Tinghir",
    "lat": 31.5147,
    "lng": -5.5328,
    "is_active": true
  },
  {
    "id": "daaf8865-9b9d-57c8-8723-8a9dfcdd41c0",
    "name": "Tinjdad",
    "lat": 31.5167,
    "lng": -5.0167,
    "is_active": true
  },
  {
    "id": "4e95d66a-2121-5692-85fe-8ecdf8b5044d",
    "name": "Tissa",
    "lat": 34.2833,
    "lng": -4.6833,
    "is_active": true
  },
  {
    "id": "4d3657b4-1a45-50b9-849a-1c2254c5b558",
    "name": "Tit Mellil",
    "lat": 33.5561,
    "lng": -7.4794,
    "is_active": true
  },
  {
    "id": "8ddb9d97-bc60-5171-81cd-4b82e1bcbb68",
    "name": "Tiznit",
    "lat": 29.6974,
    "lng": -9.7316,
    "is_active": true
  },
  {
    "id": "977535ec-6d59-5be0-8f2e-f6519ac4ea67",
    "name": "Témara",
    "lat": 33.9281,
    "lng": -6.9067,
    "is_active": true
  },
  {
    "id": "0106a65a-8ce8-574f-875c-11673fc5328b",
    "name": "Tétouan",
    "lat": 35.5785,
    "lng": -5.3684,
    "is_active": true
  },
  {
    "id": "608bb402-f36b-536a-8154-4f218e65b761",
    "name": "Youssoufia",
    "lat": 32.2464,
    "lng": -8.5292,
    "is_active": true
  },
  {
    "id": "389a22a9-ef5d-52e7-854b-987c1b1b0717",
    "name": "Zagora",
    "lat": 30.3325,
    "lng": -5.8372,
    "is_active": true
  },
  {
    "id": "b396c06b-d557-5c30-8f1b-bc9824e5cf53",
    "name": "Zaida",
    "lat": 32.8167,
    "lng": -4.95,
    "is_active": true
  },
  {
    "id": "b2de13ee-8f11-5121-8274-4eaa8b16cf8b",
    "name": "Zaio",
    "lat": 34.9394,
    "lng": -2.7361,
    "is_active": true
  },
  {
    "id": "3b1e7cc7-9a1b-5a8f-82d5-dc680f7a206f",
    "name": "Zemamra",
    "lat": 32.6289,
    "lng": -8.7017,
    "is_active": true
  },
  {
    "id": "51211770-2c57-5fbc-8f15-73c45e8006ff",
    "name": "Zoumi",
    "lat": 34.7833,
    "lng": -5.35,
    "is_active": true
  }
];

export default CITIES;
