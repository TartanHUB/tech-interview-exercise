import React, { FunctionComponent, useEffect, useState } from 'react';
import { navigate, RouteComponentProps } from '@reach/router';
import styled from 'styled-components';
import useSWR from 'swr';
import Skeleton from 'react-loading-skeleton';

import { Alert, Button, Heading, Modal } from '../components';
import useSessionStorage from '../hooks/useSessionStorage';

type GalleryProps = {} & RouteComponentProps;

type ImageType = {
  id: number;
  thumbnailUrl: string;
  title: string;
  url: string;
};

const HeadingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${(props) => props.theme.sizes.baseSpacer};
`;

const User = styled.span`
  margin-right: ${(props) => props.theme.sizes.halfSpacer};
`;

const GalleryWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: ${(props) => props.theme.sizes.baseSpacer};
`;

const StyledThumbnail = styled.img`
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease-in-out;
  &:hover,
  &:focus {
    transform: scale(1.05);
  }
`;

const StyledFigure = styled.figure`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Gallery: FunctionComponent<GalleryProps> = () => {
  const { session, clear } = useSessionStorage('tartanHub');
  const { data, isValidating, error } = useSWR(
    'https://jsonplaceholder.typicode.com/albums/1/photos'
  );

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<ImageType | undefined>(undefined);

  useEffect(() => {
    if (!session) {
      navigate('/');
    }
  }, [session]);

  const imagesToShow = 10;

  return (
    <>
      <HeadingWrapper>
        <Heading>Gallery</Heading>
        <div>
          {session ? <User>Hi, {session.username}!</User> : null}
          <Button type="button" onClick={() => clear()}>
            Log Out
          </Button>
        </div>
      </HeadingWrapper>

      {error && <Alert type="danger" message="Something went wrong, please try again!" />}

      <Heading as="h2">
        {!isValidating ? (
          `Showing 1-${imagesToShow} of ${(data as Array<ImageType>).length}`
        ) : (
          <Skeleton width="50%" />
        )}
      </Heading>
      <GalleryWrapper>
        {!isValidating
          ? (data as Array<ImageType>).slice(0, imagesToShow).map((item: ImageType) => (
              <div key={item.id}>
                <StyledThumbnail
                  src={item.thumbnailUrl}
                  alt={item.title}
                  title={item.title}
                  onClick={() => {
                    setActiveImage(item);
                    setModalIsOpen(true);
                  }}
                />
              </div>
            ))
          : Array.from({ length: imagesToShow }).map((item, index) => (
              <Skeleton key={index} style={{ paddingBottom: '90%' }} />
            ))}
      </GalleryWrapper>

      <Modal
        toggleModal={() => {
          setActiveImage(undefined);
          setModalIsOpen(false);
        }}
        isOpen={modalIsOpen}
      >
        <StyledFigure>
          <img src={activeImage?.url} alt={activeImage?.title} width={600} height={600} />
          <figcaption>{activeImage?.title}</figcaption>
        </StyledFigure>
      </Modal>
    </>
  );
};

export default Gallery;
