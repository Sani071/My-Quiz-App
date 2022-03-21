import React from 'react';
import { Container, Card } from 'reactstrap'

export default function AppLayout({ children }) {
    return (
        <>
            <Container>
                <Card className="mt-3 shadow p-2">
                    {children}
                </Card>
            </Container>
        </>
    );
}
