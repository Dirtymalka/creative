import React from 'react';
import { makeStyles } from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';

const useStyles = makeStyles((theme) => ({
  card: {
    width: 135,
    height: 135,
    position: 'relative',
    margin: 5,
    fontSize: '1rem',
    borderRadius: 5,
  },
  preview: {
    width: '100%',
    height: '100%',
  },
  title: {
    position: 'absolute',
    width: '100%',
    height: 32,
    background: 'rgba(0, 0, 0, 0.4)',
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    color: 'white',
    zIndex: 1,
    alignItems: 'center',
  },
  titleText: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  folderIcon: {
    width: '100%',
    height: '100%',
  },
}));

export const Card = ({ preview, name }: { preview: string; name: string }) => {
  const s = useStyles();

  return (
    <div
      className={s.card}
      style={{
        backgroundImage: `url(${preview})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
      }}
    >
      <div className={s.preview}>{!preview && <FolderIcon className={s.folderIcon} />}</div>
      <div className={s.title}>
        <span className={s.titleText}>{name}</span>
      </div>
    </div>
  );
};
