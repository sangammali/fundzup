import PlansContainer from 'containers/plans/plansDetails/PlansContainer'
import ErrorBoundary from 'components/ErrorBoundary'

const PlansDetailPage = () => {
  return (
    <ErrorBoundary>
      <PlansContainer/>
    </ErrorBoundary>
  )
}

export default PlansDetailPage;
