var app = new Vue (
    {
        el: "#root",
        data: {
            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Ricordati di dargli da mangiare',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            text: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            text: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            text: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },     
                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            text: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            text: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            text: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Luisa',
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                
            ],

            activeIndex: 0,

            newSendMessage: {},

            search: '',

            activeMessage: 0,

            display: false
        
        },
        // computed: {
        //     filteredContacts: function() {
        //         this.activeIndex = 0;
        //         return this.contacts.filter((contact) => {
        //             return contact.name.toLowerCase().includes(this.search.toLowerCase()); 
        //         })  
                
        //     }
        // },

        methods: {
            getImage:function(i){
                let imgUrl = this.contacts[i].avatar  
                return `img/avatar${imgUrl}.jpg`;
                //ES6:
                //const {avatar} = this.contacts[i];
                //return `img/avatar${avatar.jpg}`

            },

            getLastMessage: function(i){
                return this.contacts[i].messages[this.contacts[i].messages.length-1].text.substr(0,12);
            }, 

            getLastMessageDate: function(i) {
                return this.contacts[i].messages[this.contacts[i].messages.length-1].date; 
            },

            getActiveContact: function(i) {
                return this.activeIndex = i;  
            },
             
            sendMessage: function() {

                const messageDate = dayjs().format('DD/MM/YYYY HH:mm:ss');

                if (this.newSendMessage.text.trim().length>0) {

                    this.newSendMessage.date = messageDate;
                    this.newSendMessage.status = "sent";
                    this.contacts[this.activeIndex].messages.push(this.newSendMessage); 
    
                };
                setTimeout(() => {
                    this.contacts[this.activeIndex].messages.push({ 
                        text: "ok",
                        date: messageDate,
                        status: "received"

                    })

                }, 1000);

                this.newSendMessage = {}  

            },

            onKeyDown: function(event) {
                this.sendMessage();
                
            },

            searchContact: function() {  
                for (i=0; i < this.contacts.length; i++) {
                    let isIncluded = this.contacts[i].name.toLowerCase().includes(this.search.toLowerCase());

                    if (isIncluded == true) {
                        this.contacts[i].visible = true;
                    } else {
                        this.contacts[i].visible = false
                    }
                }      
            },

            toggleToDisplay: function(i) {

                this.activeMessage = i;

                // SHORT VERSION
                this.display = !this.display

                //LONG VERSION
                // if(this.display == false) {
                //     this.display = true;
                // } else {
                //     this.display = false
                // }
            },

            deleteMessage: function(i){
                this.contacts[this.activeIndex].messages.splice(i,1);

                if(this.contacts[this.activeIndex].messages.length == 0) {
                    this.contacts.splice(this.activeIndex,1)
                    if(this.contacts.length < 1) {
                        this.contacts.push([
                            {
                                name: '',
                                avatar: '',
                                visible: true,
                            }
                        ])
                    }
                    
                } ;
                this.display=false;
            }

        }
        
    }
    
)



