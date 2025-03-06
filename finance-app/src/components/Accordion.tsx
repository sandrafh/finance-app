import React, { useState } from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import RightArrowIcon from '@assets/icons/right-arrow.svg'
import { colors } from '@constants/ColorsConstants'

interface AccordionProps {
  header: React.ReactNode
  children: React.ReactNode
  hasArrow?: boolean
}

export const Accordion = ({ header, children, hasArrow = true }: AccordionProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => setIsExpanded((prev) => !prev)

  return (
    <View>
      <TouchableOpacity onPress={toggleExpand} style={styles.header}>
        <View style={styles.arrowContainer}>
          {hasArrow && (
            <RightArrowIcon
              width={16}
              height={16}
              color={colors.grey1}
              style={{ transform: [{ rotate: isExpanded ? '90deg' : '0deg' }] }}
            />
          )}
        </View>
        {header}
      </TouchableOpacity>
      {isExpanded && <View style={styles.content}>{children}</View>}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 16,
    backgroundColor: colors.highlight,
  },
  arrowContainer: {
    width: 16, // Reserve space for the arrow even if it's not shown
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingLeft: 48,
  },
})
