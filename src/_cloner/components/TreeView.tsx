import * as React from 'react';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

type Props = {
    content: React.ReactNode
}

export default function FileSystemNavigator(props: Props) {
    const {content} = props
  return (
    <Box sx={{ minHeight: 180, flexGrow: 1}}>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        <TreeItem nodeId="1" label="مجوزها">
            {content}
        </TreeItem>
      </TreeView>
    </Box>
  );
}