import React, { useMemo, useState } from 'react';
import clsx from 'clsx';
import './App.css';
import Header from './features/header/Header';
import MyDrawer from './features/drawer/Drawer';
import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { drawerWidth } from './constants/constants';
import MainContent from './features/content/MainContent';
import { nanoid } from '@reduxjs/toolkit';

import FolderIcon from '@material-ui/icons/Folder';
import ImageIcon from '@material-ui/icons/Image';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
}));

function App() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const [files, setFiles] = useState<any[]>([]);

  const [selected, setSelected] = useState<any>('');

  const setSelectedFolder = (id: string) => {
    setSelected(id);
  };

  const getFlatStructure = (files: any[]) => {
    let result: any[] = [];
    files.forEach((file) => {
      if (file.children) {
        const folder = { ...file, children: file.children.map(({ id }: { id: string }) => id) };
        result = [...result, folder].concat(getFlatStructure(file.children));
      } else {
        result = [...result, file];
      }
    });

    return result;
  };

  const prepareFiles = () => {
    const arrFiles = files.map((file) => file.path.split('/').filter((f: '') => !!f));

    const treeFolder = arrFiles.reduce((tree, path) => {
      let children: any = tree.children;

      const existedFolder = tree.find((tr: any) => tr.name === path[0]);

      let result: any = existedFolder ? existedFolder : {};

      path.forEach((item: string, index: number) => {
        const isLastItem = index === path.length - 1;
        if (result.idxPath === index && result.name === item) {
          children = result.children;
          return;
        }

        if (children && children.find((child: any) => child.name === item)) {
          children = children.find((child: any) => child.name === item).children;
          return;
        }

        const folder = isLastItem
          ? {
              id: nanoid(),
              name: item,
              idxPath: index,
              icon: ImageIcon,
              preview: files.find(({ path }) => path.includes(item))?.preview,
            }
          : {
              id: nanoid(),
              name: item,
              children: [],
              idxPath: index,
              icon: FolderIcon,
            };

        if (children !== undefined) {
          children.push(folder);
        } else {
          result = folder;
        }
        children = folder.children;
      });

      return existedFolder ? [...tree] : [...tree, result];
    }, []);

    return treeFolder;
  };

  const treeFiles = useMemo(() => prepareFiles(), [files]);
  const flatData = useMemo(() => getFlatStructure(treeFiles), [prepareFiles]);

  return (
    <div className="App">
      <Header />

      <div>
        <MyDrawer
          open={open}
          close={() => {
            setOpen(false);
          }}
          files={treeFiles}
          setSelectedFolder={setSelectedFolder}
        />
        <div style={{ display: 'flex', marginLeft: open ? drawerWidth : 0 }}>
          <div>
            <IconButton
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
              color="inherit"
              aria-label="menu"
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </div>
          <MainContent setFiles={setFiles} flatData={flatData} selected={selected} />
        </div>
      </div>
    </div>
  );
}

export default App;
