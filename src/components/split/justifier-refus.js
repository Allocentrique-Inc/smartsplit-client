() => {
    let _m = this.state.modifierVote
    _m[droit] = false
    this.setState({modifierVote: _m})
    confirmAlert({
        title: `Tu refuses la proposition !`,
        message: `Es-tu certain ?`,
        style: {
                position: "relative",
                width: "640px",
                height: "660px",
                margin: "0 auto",
                background: "#FFFFFF",
                border: "1px solid rgba(0, 0, 0, 0.5)",
                boxSizing: "border-box",
                boxShadow: "inset 0px -1px 0px #DCDFE1"
            },
        customUI: ({ onClose }) => 
            <div>         
                <h3>Indiques à tes collaborateurs pourquoi tu n'es pas à l'aise avec ce split.</h3>               
                <textarea 
                    cols={40} 
                    rows={5} 
                    id="raison" 
                    defaultValue={raisonPrecedente}
                    placeholder="Pourquoi refuses-tu le split (optionel)" 
                    style={{
                    width: "546px",
                    height: "253px",
                    left: "436px",
                    top: "429px",                              
                    background: "#FFFFFF",
                    border: "1px solid rgba(0, 0, 0, 0.5)",
                    boxSizing: "border-box",
                    boxShadow: "inset 0px -1px 0px #DCDFE1"
                }}></textarea><p/>
                <button style={{
                    background: "rgb(45, 168, 79)",
                    borderRadius: "2px",
                    width: "100%",                                
                    fontWeight: "bold",
                    fontSize: "1.2rem"
                }}
                onClick={()=>{

                    // Justifier le refus
                
                    onClose()
                }                                
                }
                >Refuser ce partage</button>
            </div>
    })
}