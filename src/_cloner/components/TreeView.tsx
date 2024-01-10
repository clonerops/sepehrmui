import * as React from 'react';
import Box from '@mui/material/Box';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';

type Props = {
    content: React.ReactNode
}

export default function FileSystemNavigator(props: Props) {
    const {content} = props
  return (
    <Box sx={{ minHeight: 180, flexGrow: 1}}>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<RemoveCircleOutline />}
        defaultExpandIcon={<AddCircleOutline />}
      >
        <TreeItem nodeId="1" label="مجوزها">
            {content}
        </TreeItem>
      </TreeView>
    </Box>
  );
}