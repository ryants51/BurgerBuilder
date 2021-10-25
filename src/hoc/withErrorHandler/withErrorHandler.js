import React, {useState, useEffect} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxilliary/Auxilliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return (props) => {
        const [error, setError] = useState(null);

        useEffect(() => {
            const reqInterceptor = axios.interceptors.request.use((req) => {
                setError(null);
                return req;
            });
            const resInterceptor = axios.interceptors.response.use(res => res, (error) => {
                setError(error);
            });
            return () => {
                // This ejects the interceptors when they aren't needed anymore
                // This helps with memory leaks and unexpected state changes
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            }
        }, [])

        const errorConfirmedHandler = () => {
            setError(null);
        }

        return (
            <Aux>
                <Modal 
                    show={error}
                    modalClosed={errorConfirmedHandler}>
                    {error && error.message}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        );
    } 
}

export default withErrorHandler;