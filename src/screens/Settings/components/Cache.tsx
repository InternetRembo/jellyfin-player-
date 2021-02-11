import React, { useCallback } from 'react';
import TrackPlayer from 'react-native-track-player';
import { SubHeader } from 'components/Typography';
import { useDispatch } from 'react-redux';
import music from 'store/music';
import { t } from '@localisation';
import Button from 'components/Button';
import styled from 'styled-components/native';
import Text from 'components/Text';

const ClearCache = styled(Button)`
    margin-top: 16px;
`;

export default function CacheSettings() {
    const dispatch = useDispatch();
    const handleClearCache = useCallback(() => {
        // Dispatch an action to reset the music subreducer state
        dispatch(music.actions.reset());

        // Also clear the TrackPlayer queue
        TrackPlayer.reset();
    }, [dispatch]);

    return (
        <>
            <SubHeader>{t('setting-cache')}</SubHeader>
            <Text>{t('setting-cache-description')}</Text>
            <ClearCache title={t('reset-cache')} onPress={handleClearCache} />
        </>
    );
}