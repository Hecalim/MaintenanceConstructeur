fetch('data/donnees.json')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('tableBody')

        // Mapper les clés aux classes CSS correspondantes
        const keyClassMap = {
            'localisation': 'row-start',
            'designation': 'w-full',
            'materiels': 'txt-right',
            'action': 'row-end'
        }

        // Parcourir les données et les ajouter au tableau
        data.forEach(item => {
            const tr = document.createElement('tr')
            tr.classList.add('txt-base')

            // Ajouter un attribut data-href à chaque ligne avec le lien correspondant
            tr.setAttribute('data-href', item.lien)

            // Ajouter un gestionnaire d'événements au clic sur chaque ligne
            tr.addEventListener('click', function() {
                const url = this.getAttribute('data-href')
                window.open(url, "_self")
            });

            // Créer et ajouter les cellules de données
            Object.entries(item).forEach(([key, value]) => {
                if (key !== 'lien') {
                    const td = document.createElement('td')
                    if (keyClassMap[key]) {
                        td.classList.add(keyClassMap[key])
                    }
                    switch(key){
                        case 'checkbox' :
                            const checkbox = document.createElement('input')
                            checkbox.type = 'checkbox'
                            td.appendChild(checkbox)
                            td.classList.add('bg-transparent')
                            break
                        case 'action' :
                            const button = document.createElement('button')
                            button.type = 'button'
                            button.classList.add('btn--round', 'more')
                            button.addEventListener('click', (event) => {
                                event.stopPropagation()
                            });
                            td.appendChild(button)
                            break
                        default:
                            td.textContent = value
                    }
                    tr.appendChild(td)
                }
            });
            tableBody.appendChild(tr)
        });
    })
    .catch(error => console.error('Une erreur s\'est produite :', error))
