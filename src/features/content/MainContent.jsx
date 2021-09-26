import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/core';
import { Card } from '../card/Card';

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    width: '100%',
    height: '100vh',
  },
  dropContainer: {
    width: '100%',
    height: 100,
    backgroundColor: 'rgba(103,102,102,0.43)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    marginTop: 20,
    display: 'flex',
  },
}));

const MainContent = ({ setFiles, flatData, selected }) => {
  const classes = useStyles();

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const folders = useMemo(
    () => flatData.find(({ id }) => id === selected)?.children || [],
    [flatData, selected]
  );

  return (
    <div className={classes.main}>
      <div {...getRootProps({ className: 'dropzone' })} className={classes.dropContainer}>
        <input {...getInputProps()} />
        <span>DROP HERE</span>
      </div>
      <div className={classes.content}>
        {folders.map((folder) => {
          const selectedFolder = flatData.find(({ id }) => id === folder);
          return <Card key={folder} name={selectedFolder.name} preview={selectedFolder.preview} />;
        })}
      </div>
    </div>
  );
};

export default MainContent;
