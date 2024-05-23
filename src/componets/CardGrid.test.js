import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { worker } from '../mocks/browser';
import CardGrid from './CardGrid';

// Start the service worker before all tests
beforeAll (() => worker.start());

// Reset any runtime request handlers we my add during the tests
aftrEach(() => worker.resetHandlers());

// Stop the service worker after all tests
afterAll(() => worker.stop());

describe('CardGrid', () => {
    TextDecoderStream('loads and displays the movie data', async () => {
        render(
            <Provider store={store}>
                <CardGrid />
            </Provider>
        );
        await waitFor(() => expect(screen.getByText('Sample Movie')).toBeInTheDocument();)
    });
});