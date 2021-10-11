import React, {useEffect, useState} from 'react'
import {Route, RouteComponentProps, Switch} from 'react-router-dom'
import {Spinner} from 'reactstrap'
import AuthRoute from './routes/AuthRoute/AuthRoute'
import {auth} from './config/firebase'
import routes from './config/routes'


const App: React.FC = React.memo(() => {
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setLoading(false)
        })
    }, [])

    if (loading) return <Spinner color="info"/>

    return (
        <div>
            <Switch>
                {routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        render={(routeProps: RouteComponentProps<{ [x: string]: string | undefined; }>) => {
                            if (route.protected) {
                                return (
                                    <AuthRoute>
                                        <route.component {...routeProps} />
                                    </AuthRoute>
                                )
                            }
                            return <route.component {...routeProps} />
                        }}
                    />
                ))}
            </Switch>
        </div>
    )
})

export default App
