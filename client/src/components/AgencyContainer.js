import AgencyCard from './AgencyCard'


function AgencyContainer({ agencies }) {
  const agencyCards = agencies.map((agent) => {
    return <AgencyCard key={agent.id} agent={agent} />
  })

  return (
    <div className="agency-container">
      {agencyCards}
    </div>
  )
}

export default AgencyContainer
