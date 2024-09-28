export class RegisterForm {
    
    config = {
    
        registerLabel: {
            text: 'Register',
            tag: 'label',            
        },
    
        usernameEntry: {
            text: 'Input your username',
            tag: 'input',
        },

        registerEmailEntry: {
            text: 'Input your mail',
            tag: 'input',
        },
    
        registerPasswordEntry: {
            text: 'Input your password',
            tag: 'input',
        },

        registerSubmitBtn: {
            text: 'Register!',
            tag: 'button',
        },
        
    };
    
    render( formName ) {
        const form = document.createElement('form');
        //form.id = formName;


        const bigObj = this.config;
    
        for (const key in bigObj) {
          
          const tag = bigObj[key]['tag'];

          const newElement = document.createElement( tag );
          newElement.id = key;

          switch(tag) {
            case 'input':  
                newElement.placeholder = bigObj[key]['text'];
                break
            case 'label':
                newElement.innerText = bigObj[key]['text'];
                break
            case 'button': 
                newElement.innerText = bigObj[key]['text'];
                break
            case 'submit': 
                newElement.innerText = bigObj[key]['text'];
                break
              
          }

          form.appendChild(newElement);
          
        
        }
        /*const template = Handlebars.templates['Register.hbs'];
          
        const items = 

        form.innerHTML = template({items});*/

        return form;
        
    }
   
}



