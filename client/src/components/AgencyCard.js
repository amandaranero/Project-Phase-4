import '../DogCard.css'
function AgencyCard({agent}){
    const {id, name, email, address} = agent
    return(
        <div className="card">
            <div className="content">
                <div className="title">
                    {name}
                </div>
                {email}
            </div>
        </div>
    )
}
export default AgencyCard