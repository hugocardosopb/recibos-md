const { PDFDocument, StandardFonts, rgb } = PDFLib

    const nome = document.getElementById('nome_funcionario')
    const material = document.getElementById('material')
    const quantidade = document.getElementById('quantidade')
    const buttonGenerate = document.getElementById('btn-id')
    const button_Add = document.getElementById('btn-Add')
    const modal = document.getElementById('more-itens')
    const closeModal = document.getElementById('close')

    //aqui eu pego todos os inputs onde é inserido os nomes dos materiais.
    const materiais = document.querySelectorAll('.ma')

    const qtd = document.querySelectorAll('.qt')
    let regex = /^[a-zA-ZÀ-ú\s]+$/;
    

		
    async function createPdf() {

        let result = '';

        
        for (let i = 0; i < qtd.length; i++) {
            if(qtd[i].value !== '' && materiais[i].value !== '') {
                result += `(${qtd[i].value}) - ${materiais[i].value}\n`;
            }
            else {
                result += ''
            }
            
        }
        
        
      if(nome.value === '' || material.value === '' || quantidade.value === '') {
        alert('Você precisa preencher todos os campos!')
        return
      }

      if(!regex.test(material.value)) {
	alert('Apenas texto no campo Material')
	return
      }


      else {
        const pdfDoc = await PDFDocument.create()
			
        const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

        const page = pdfDoc.addPage()

        const { width, height } = page.getSize()

        const fontSize = 14
        page.drawText(`Mais Descartáveis - Recursos Humanos\n------------------------------------------------------------------------------------------------\nEu,\n ${nome.value}, declaro que peguei os materiais:\n${result} \n\n\nAss:__________________________                              ___/___/___\n------------------------------------------------------------------------------------------------`, {
            x: 50,
            y: height - 4 * fontSize,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(0,0,0),
        })
        
        const pdfBytes = await pdfDoc.save()
        download(pdfBytes, "recibo-material", "application/pdf");
        }

        // limpa todos os campos aqui
    }


    function addEl() {
        modal.setAttribute('style', 'display:flex')
    }

    closeModal.addEventListener('click', () => {
        modal.setAttribute('style', 'display:none')
    })

    button_Add.addEventListener('click', addEl)
    buttonGenerate.addEventListener('click', createPdf)
