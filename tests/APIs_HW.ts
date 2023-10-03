Feature('Pruebas de APIs REST y GRAPHQL')

// Scenario('Test REST GET', async ({ I }) => {
// 	const response = await I.sendGetRequest('https://pokeapi.co/api/v2/pokemon')

// 	//Validamos que el código de respuesta sea correcto
// 	I.assertEqual(response?.status, 200)

// 	//Validación sobre la data de forma individual
// 	I.assertEqual(response?.data?.results?.[3]?.name, 'charmander')
// 	I.assertEqual(response?.data?.results?.[5]?.name, 'charizard')

// 	// Validacion negativa sobre la data por individual
// 	I.assertNotEqual(response?.data?.results?.[5]?.name, 'bulbasur')
// })

Scenario('Test of backend GRAPHQL QUERY GET', async ({ I }) => {
	const response = await I.sendQuery(
		`
    query pokemon($name: String!) {
        pokemon(name: $name) {
          id
          name
          sprites {
            front_default
          }
          moves {
            move {
              name
            }
          }
          types {
            type {
              name
            }
          }
        }
      }`,
		{ name: 'snorlax' }
	)

	// Validacion del estatus 200
	I.assertEqual(response?.status, 200)

	// Validamos que snormax no tiene el id 150, y que tiene el 143
	I.assertNotEqual(response?.data?.data?.pokemon?.id, 150)
	I.assertEqual(response?.data?.data?.pokemon?.id, 143)
})
